// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chttp::prelude::*;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command(async)]
fn post(url: String, payload: String) -> Result<String, String> {
    Ok(chttp::post(url, payload)
        .map_err(|e| e.to_string())?
        .text()
        .map_err(|e| e.to_string())?)
}

#[tauri::command(async)]
fn get(url: String) -> Result<String, String> {
    Ok(chttp::get(url)
        .map_err(|e| e.to_string())?
        .text()
        .map_err(|e| e.to_string())?)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![post, get])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
