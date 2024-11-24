module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/peanutcocktail/echomimic_v2 app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
//          "pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 xformers==0.0.28.post3 --index-url https://download.pytorch.org/whl/cu124",
//          "pip install torchao --index-url https://download.pytorch.org/whl/nightly/cu124",
          "pip install -r requirements.txt",
          "pip install --no-deps facenet_pytorch==2.6.0",
          "pip install {{platform === 'darwin' ? 'eva-decord' : 'decord'}}"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",                // Edit this to customize the path to start the shell from
        venv: "env",
        message: [
          "pip install huggingface_hub[cli]",
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",                // Edit this to customize the path to start the shell from
        venv: "env",
        message: [
          "huggingface-cli download BadToBest/EchoMimicV2 --local-dir pretrained_weights",
          "huggingface-cli download stabilityai/sd-vae-ft-mse --local-dir pretrained_weights/sd-vae-ft-mse",
          "huggingface-cli download lambdalabs/sd-image-variations-diffusers --local-dir pretrained_weights/sd-image-variations-diffusers",
          "huggingface-cli download cocktailpeanut/audio_processor --local-dir pretrained_weights/audio_processor"
        ]
      }
    },
  ]
}
