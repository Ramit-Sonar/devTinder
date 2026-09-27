# Git Feature Branch Workflow

```bash
# Start new feature
git checkout main
git pull origin main
git checkout -b feat/<feature-name>

# After working
git status
git add .
git commit -m "feat: <what you did>"
git push -u origin feat/<feature-name>

# GitHub
# Create PR → Review → Merge

# After merge
git checkout main
git pull origin main

# Create tag for the completed PR/feature
git tag -a v1.0.0 -m "PR: <feature-name>"
git push origin v1.0.0
```

## Example

```bash
git tag -a v1.1.0 -m "PR: creating express server"
git push origin v1.1.0
```

# Tag Versioning

```text
v1.0.0 → Initial completed version
v1.1.0 → New feature / completed PR
v1.2.0 → Another feature / completed PR
v1.0.1 → Bug fix
```
