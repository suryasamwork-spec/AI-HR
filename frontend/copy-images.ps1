# Run this script once from the frontend folder to copy spotlight images
$src = "$PSScriptRoot\..\caldimcareers\public\images"
$dst = "$PSScriptRoot\public\images"

Copy-Item "$src\civil-1.jpg.jpg" "$dst\civil-1.jpg" -Force
Copy-Item "$src\civil-2.jpg.jpg" "$dst\civil-2.jpg" -Force
Copy-Item "$src\civil-3.jpg.jpg" "$dst\civil-3.jpg" -Force
Copy-Item "$src\soft-1.jpg.jpg"  "$dst\software-1.jpg" -Force
Copy-Item "$src\soft-2.jpg.jpg"  "$dst\software-2.jpg" -Force
Copy-Item "$src\soft-3.jpg.jpg"  "$dst\software-3.jpg" -Force

Write-Host "Done! Images copied to frontend/public/images/"
Get-ChildItem $dst
