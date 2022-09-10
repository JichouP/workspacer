use std::process::Command;

#[command]
pub fn launch_code(path: String) -> Result<(), String> {
    let shell = match cfg!(windows) {
        true => "cmd",
        false => "sh",
    };

    Command::new(shell)
        .args(["/C", "code", &path])
        .spawn()
        .map_err(|e| e.to_string())?;

    Ok(())
}
