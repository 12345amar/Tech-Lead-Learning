# Day 1 Setup Status

**Last updated:** 2026-11-25  
**Operating system:** macOS  
**Mac architecture:** arm64 (Apple Silicon) — confirmed  
**Setup status:** Architecture verified; JDK installation pending  
**Overall Day 1 status:** In progress

## Setup checklist

- [x] Identify Mac architecture (`arm64` / Apple Silicon)
- [ ] Install JDK 25 — macOS AArch64 / ARM64, JDK package, PKG installer
- [ ] Install VS Code
- [ ] Install the Microsoft Extension Pack for Java
- [ ] Verify `java -version`
- [ ] Verify `javac -version`
- [ ] Run `HelloWorld.java`

## Correct JDK download

Use [Eclipse Temurin JDK 25 releases](https://adoptium.net/temurin/releases/?os=mac&arch=aarch64&package=jdk&version=25).

Choose:
- Version: 25 (LTS)
- Operating system: macOS
- Architecture: AArch64 / ARM64
- Package: JDK
- Installer: PKG

The installer filename should identify `jdk_aarch64_mac` and end in `.pkg`.

## Next steps

1. Download and run the matching PKG installer.
2. Open a new Terminal window.
3. Run:

```bash
java -version
javac -version
/usr/libexec/java_home -V
```

4. Share the output in the learning conversation.

Do not mark setup complete until both Java version commands work and `HelloWorld.java` runs successfully.
