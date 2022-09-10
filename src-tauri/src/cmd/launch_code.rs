use std::process::Command;

#[command]
pub fn launch_code(path: String) -> Result<(), String> {
    let child = Command::new("cmd").args(["/C", "code", &path]).spawn();
    // let child = Command::new("code").arg(path).spawn();

    match child {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}
