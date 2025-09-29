# Identity and Access Management (IAM) & Security

## Key Concepts
- Manages who (identity) has what access (role) to which resource.
- Follows **Principle of Least Privilege**.

## Roles
- **Primitive roles** → Owner, Editor, Viewer
- **Predefined roles** → e.g. `roles/storage.objectAdmin`
- **Custom roles** → User-defined roles with specific permissions

## Security Features
- Service Accounts → Identities for apps/VMs
- IAM Conditions → Context-aware access
- Organization Policy → Restrict resource usage
- Cloud KMS → Key management

## Exam Tips
- IAM policies are **inherited down hierarchy**.
- Use **service accounts** for apps, not users.
- Remember shared responsibility model: Google secures infra, you secure data & IAM.

➡️ Next: [Networking](./3_Networking.md)  
⬅️ Back: [Home](./1_Home.md)
