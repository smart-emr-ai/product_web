param(
  [int]$Port = 3001,
  [string]$HostAlias = "volc-ecs",
  [switch]$PrintOnly
)

$ErrorActionPreference = "Stop"

$ips = & ssh $HostAlias "docker inspect -f '{{range .NetworkSettings.Networks}}{{println .IPAddress}}{{end}}' medicore-umami"
if ($LASTEXITCODE -ne 0) {
  throw "Failed to inspect medicore-umami on $HostAlias."
}

$umamiIp = $ips |
  ForEach-Object { $_.Trim() } |
  Where-Object { $_ } |
  Select-Object -First 1

if (-not $umamiIp) {
  throw "No Docker IP found for medicore-umami."
}

$forward = "{0}:{1}:3000" -f $Port, $umamiIp
$sshArgs = @("-N", "-L", $forward, $HostAlias)

Write-Host "Umami local URL: http://127.0.0.1:$Port/login"
Write-Host "Keep this window open while viewing the dashboard."
Write-Host "Tunnel target: ${umamiIp}:3000"

if ($PrintOnly) {
  Write-Host ("ssh " + ($sshArgs -join " "))
  exit 0
}

& ssh @sshArgs
