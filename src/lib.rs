use twox_hash::XxHash64;
use std::hash::Hasher;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn xxhash(input: &str) {
    let mut hasher = XxHash64::with_seed(0);
    hasher.write(input.as_bytes());
    format!("{:x}", hasher.finish());
}
