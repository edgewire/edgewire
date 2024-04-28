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

func SetupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Get("/generate_keys", func(c *fiber.Ctx) error {
		_, publicKey := GenerateKeys()
		return c.Send(publicKey.Bytes())
	})
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	SetupRoutes(app)

	app.Listen(":8080")
}
