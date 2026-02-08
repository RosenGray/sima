# Infrastructure (Kubernetes)

## Client deployment – Server Actions encryption key

The Next.js client uses Server Actions. For them to work after pod restarts (and across replicas), the same encryption key must be used by all instances. Set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` via a Kubernetes secret.

**One-time setup (prod and dev):** create the secret with a base64-encoded 32-byte value:

```bash
kubectl create secret generic server-actions-encryption-key \
  --from-literal=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
```≈

Use the same secret name in the namespace where `client-depl` runs. Without this, Server Actions can fail with "Failed to find Server Action" after a pod restart or when multiple replicas run with different keys.
