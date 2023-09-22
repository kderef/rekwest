import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";

window.addEventListener("DOMContentLoaded", async () => {
    const os = await invoke<string>("os");

    let urlInput = document.querySelector<HTMLInputElement>("#url")!;

    let btnPost = document.querySelector<HTMLButtonElement>("#btn-post")!;
    let btnGet = document.querySelector<HTMLButtonElement>("#btn-get")!;

    let response = document.querySelector<HTMLTextAreaElement>("#response")!;
    let payloadIn = document.querySelector<HTMLTextAreaElement>("#payload")!;

    if (os === "windows") {
        response.cols = 72;
        payloadIn.cols = 72;
    }

    btnPost.addEventListener("click", async () => {
        const val = urlInput.value.trim();
        if (val === '') return;

        try {
            response.value = await invoke("post", {url: val, payload: payloadIn.value});
        } catch (error) {
            message(""+error, {title: "POST failed", type: "error"});
        }
    });

    btnGet.addEventListener("click", async () => {
        const val = urlInput.value.trim();
        if (val === '') return;
        

        try {
            response.value = await invoke("get", {url: val});
        } catch (error) {
            message(""+error, {title: "GET failed", type: "error"});
        }
    });

    invoke;
});
