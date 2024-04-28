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

func ExchangeKeys(c *fiber.Ctx) error {
	// Assume the client sends their public key in a JSON format
	var clientPubKey ecdh.PublicKey
	if err := c.BodyParser(&clientPubKey); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid public key format"})
	}

	// Generate server keys
	_, serverPubKey := GenerateKeys()

	// Send the server public key back to the client
	return c.JSON(fiber.Map{"serverPublicKey": serverPubKey})
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
