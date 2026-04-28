module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/peanutcocktail/echomimic_v2 app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install wheel",
          "uv pip install git+https://github.com/openai/CLIP.git@d50d76daa670286dd6cacf3bcd80b5e4823fc8e1 --no-build-isolation",
          "uv pip install -r ../requirements.txt",
          "uv pip install --no-deps facenet_pytorch==2.6.0",
          "uv pip install pydantic==2.10.6 hf-xet"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        bluefairy: "off",
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true,
          triton: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: 'hf download BadToBest/EchoMimicV2 --exclude "*.md" --local-dir pretrained_weights && dir'
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: 'hf download stabilityai/sd-vae-ft-mse --exclude "*.md" --local-dir pretrained_weights/sd-vae-ft-mse && dir'
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: 'hf download lambdalabs/sd-image-variations-diffusers --exclude "*.md" --local-dir pretrained_weights/sd-image-variations-diffusers && dir'
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: 'hf download cocktailpeanut/audio_processor --exclude "*.md" --local-dir pretrained_weights/audio_processor && dir'
      }
    }
  ]
}
