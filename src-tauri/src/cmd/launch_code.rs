use std::process::Command;

#[command]
pub fn launch_code(path: String) -> Result<(), String> {
    if cfg!(windows) {
        if path.starts_with(r"\\wsl.localhost\") {
            let path = path.replace(r"\\wsl.localhost\", "");
            let path = path.split(&['/', '\\'][..]).collect::<Vec<_>>();
            let distribution = path[0];
            let path = path[1..].join("/");
            Command::new("cmd")
                .args([
                    "/c",
                    "code",
                    "--remote",
                    &format!("wsl+{}", distribution),
                    &format!("/{}", &path),
                ])
                .spawn()
                .map_err(|e| e.to_string())?;
        } else {
            Command::new("cmd")
                .args(["/c", "code", &path])
                .spawn()
                .map_err(|e| e.to_string())?;
        }
    } else {
        Command::new("sh")
            .args(["-c", "code", &path])
            .spawn()
            .map_err(|e| e.to_string())?;
    }

    Ok(())
}
