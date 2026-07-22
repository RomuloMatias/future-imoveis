# Pipeline Magnific MCP

The exact Magnific tool names and parameters are supplied by the connected MCP server.
Do not translate this workflow into a Higgsfield CLI command or assume a model identifier.
First inspect the available `magnific` tools, then use the image tool and a video tool that
explicitly accepts both a start image and an end image.

## 1. Prepare the local workspace

```bash
WORK=/tmp/scroll-world
ASSETS=./assets
mkdir -p "$WORK" "$ASSETS/vid"
NAMES="farm kitchen shop delivery plaza finale" # ordered section IDs
```

Write `still_<name>.txt`, `dive_<name>.txt`, and `conn_<index>.txt` with the templates
in `prompts.md`. Keep the style preamble identical for every still.

## 2. Generate scene stills through Magnific

For each section, call the available Magnific image-generation tool with:

- the contents of `still_<name>.txt`;
- landscape 3:2 output; and
- its highest practical quality setting.

Save/download the returned asset to `$WORK/still_<name>.png`. Review the complete set
before generating video; regenerate only off-style scenes. Convert approved stills for
the website:

```bash
for n in $NAMES; do cwebp -quiet -q 84 -resize 1800 0 "$WORK/still_$n.png" -o "$ASSETS/$n.webp"; done
```

## 3. Generate dive-in clips through Magnific

Use a Magnific video operation that accepts an image input. For each section, provide:

- `dive_<name>.txt`;
- `$WORK/still_<name>.png` as the start image;
- 16:9 landscape; and
- an 8–10 second duration, with sound disabled if the tool offers it.

Download each result as `$WORK/dive_<name>.mp4`. The operation must keep the supplied
start image exactly enough to make the opening seam credible.

## 4. Extract the actual seam frames

Connectors must use frames from rendered video, never the source stills.

```bash
for n in $NAMES; do
  ffmpeg -v error -ss 0 -i "$WORK/dive_$n.mp4" -frames:v 1 -q:v 2 "$WORK/first_$n.png"
  ffmpeg -v error -sseof -0.15 -i "$WORK/dive_$n.mp4" -frames:v 1 -q:v 2 "$WORK/last_$n.png"
done
```

## 5. Generate connectors through Magnific

For every adjacent pair, call a Magnific video operation that supports **both** image
inputs. Provide the connector prompt, `last_<previous>.png` as start image, and
`first_<next>.png` as end image. Request 16:9 and about 5 seconds. Save as
`$WORK/conn_<index>.mp4` in order.

If the connected Magnific server has no end-image-capable video operation, stop before
rendering connectors: this skill cannot guarantee a seamless chain with reference-only
video generation.

## 6. Encode for scroll scrubbing

Use the returned native resolution; do not upscale it. A short GOP keeps seeks responsive.

```bash
enc() { ffmpeg -v error -y -i "$1" -an -vf "unsharp=5:5:0.8:5:5:0.0" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$2"; }

for n in $NAMES; do enc "$WORK/dive_$n.mp4" "$ASSETS/vid/$n.mp4"; done
i=0; for f in "$WORK"/conn_*.mp4; do i=$((i+1)); enc "$f" "$ASSETS/vid/conn$i.mp4"; done
```

Set `sections[k].clip` to `assets/vid/<name>.mp4` and `connectors` to the ordered
`assets/vid/conn*.mp4` files.

For a native mobile chain, repeat Steps 3–6 with portrait 9:16 source canvases and
portrait prompts. The crop-only fallback remains possible, but must be disclosed as a
fallback rather than described as a mobile-optimised render.
