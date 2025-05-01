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
          xformers: true              // uncomment this line if your project requires xformers
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
          "uv pip install -r requirements.txt",
          "uv pip install --no-deps facenet_pytorch==2.6.0",
          "uv pip install pydantic==2.10.6"
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",
        message: [
          "uv pip install torchao",
          "uv pip install triton-windows==3.2.0.post18"
        ]
      }
    },
    {
      when: "{{platform === 'linux'}}",
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",
        message: "uv pip install torchao --index-url https://download.pytorch.org/whl/nightly/cu124"
      }
    },
//    {
//      when: "{{platform !== 'linux'}}",
//      method: "fs.link",
//      params: {
//        venv: "app/env"
//      }
//    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "BadToBest/EchoMimicV2" ],
        "exclude": "*.md",
        "local-dir": "pretrained_weights"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "stabilityai/sd-vae-ft-mse" ],
        "exclude": "*.md",
        "local-dir": "pretrained_weights/sd-vae-ft-mse"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "lambdalabs/sd-image-variations-diffusers" ],
        "exclude": "*.md",
        "local-dir": "pretrained_weights/sd-image-variations-diffusers"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "cocktailpeanut/audio_processor" ],
        "exclude": "*.md",
        "local-dir": "pretrained_weights/audio_processor"
      }
    }
  ]
}
