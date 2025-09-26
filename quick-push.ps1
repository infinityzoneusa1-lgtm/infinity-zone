# Quick Push Script for Infinity Zone
# This script will add, commit, and push changes directly to main branch

param(
    [string]$Message = "Quick update"
)

Write-Host "Checking repository status..." -ForegroundColor Cyan

# Check current status
git status

# Fetch latest from remote
Write-Host "Fetching latest changes..." -ForegroundColor Yellow
git fetch origin

# Check if we're behind
$behind = git rev-list --count HEAD..origin/main
if ($behind -gt 0) {
    Write-Host "Local branch is behind remote. Pulling changes..." -ForegroundColor Yellow
    git pull origin main
}

# Check if there are changes to commit
$changes = git status --porcelain
if ($changes) {
    Write-Host "Adding changes..." -ForegroundColor Green
    git add .
    
    Write-Host "Committing changes: $Message" -ForegroundColor Green
    git commit -m "$Message"
    
    Write-Host "Pushing to main branch..." -ForegroundColor Green
    git push origin main
    
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "No local changes to push." -ForegroundColor Blue
    Write-Host "Creating empty commit to refresh GitHub..." -ForegroundColor Yellow
    git commit --allow-empty -m "Refresh GitHub status"
    git push origin main
}

Write-Host "Done! Check GitHub now." -ForegroundColor Magenta