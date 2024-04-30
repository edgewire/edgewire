package main

import (
	"crypto/ecdh"
	"crypto/rand"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func GenerateKeys() (*ecdh.PrivateKey, *ecdh.PublicKey) {
	serverCurve := ecdh.X25519()
	serverPrivKey, err := serverCurve.GenerateKey(rand.Reader)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	serverPubKey := serverPrivKey.PublicKey()

	return serverPrivKey, serverPubKey
}

func GenerateSharedSecret(serverPrivKey *ecdh.PrivateKey, clientPublicKey *ecdh.PublicKey) *ecdh.PrivateKey {
	secret, err := serverPrivKey.Curve().NewPrivateKey(clientPublicKey.Bytes())
	if err != nil {
		log.Fatalf("Error computing shared secret: %v", err)
	}

	return secret
}

type KeyExchangeBody struct {
	ClientPublicKey string `json:"client_public_key"`
}

type KeyExchangeResponse struct {
	ServerPublicKey []byte `json:"server_public_key"`
}

func ExchangeKeys(c *fiber.Ctx) error {
	var body KeyExchangeBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid public key format"})
	}

	_, serverPublicKey := GenerateKeys()

	if !serverPublicKey.Equal(body.ClientPublicKey) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid public key"})
	}

	response := KeyExchangeResponse{
		ServerPublicKey: serverPublicKey.Bytes(),
	}

	return c.JSON(response)
}

func SetupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Post("/exchange_keys", ExchangeKeys)
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	SetupRoutes(app)

	app.Listen(":8080")
}
