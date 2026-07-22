# Prompt templates and intake

Keep the style preamble byte-for-byte identical across scene stills. This is the main
visual-cohesion control for generated worlds.

## Intake checklist

Collect:

- `SUBJECT`: business and one-line pitch.
- `BRAND_NAME`, `PALETTE` (4–6 named hex values), and `TONE`.
- `STYLE`: clay diorama by default, or an approved alternative.
- `SECTIONS[]`: ordered `id`, label, scene subject, eyebrow, title, body, and tags.
- `MOBILE`: yes/no; yes means a native 9:16 parallel chain.
- `IMAGE_OPERATION` and `VIDEO_OPERATION`: exposed Magnific MCP operations, including
  their current quoted usage. The video operation must accept start and end images.

## Style preamble

```text
Isometric low-poly 3D diorama floating as a small rounded island on a plain solid
[BG_HEX] background with a soft contact shadow beneath it. Soft matte clay 3D render,
rounded toy-model shapes, gentle warm studio lighting, soft long shadows, tilt-shift
miniature look. Cohesive color palette of [PALETTE]. Highly detailed, centered
composition, absolutely no text, no letters, no numbers, no logos.
```

Alternative directions: flat papercraft, glossy vinyl toy, handmade claymation, neon
night, or full-bleed photoreal architecture. For photoreal architecture, remove the
floating-island framing and make the camera glide through doors or glass instead of
opening a roof.

## Scene still prompt

```text
[STYLE PREAMBLE]
Subject: [SECTION.subject — describe the setting, a few characters doing the work, and
the concrete props that signal this stage of the story].
```

Request a 3:2 landscape image through the selected Magnific image tool. Keep focal
subjects centred and leave headroom for both landscape and portrait composition.

## Dive prompt

Use the matching scene still as the Magnific video operation's start image.

```text
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the
whole [SECTION.subject] from outside like a tiny model. The camera slowly glides forward
and descends toward it, sweeping in toward [FOCAL POINT], as if flying inside. As the
camera pushes in, the roof and upper structure gently lift and open away to reveal the
warm interior. [STYLE tail + PALETTE]. Smooth, graceful, slow motion, subtle parallax.
No text, no captions.
```

For scenes without a building, replace the roof clause with: “the camera flies low across
[the scene] toward [focal point].” Request 16:9 and an 8–10 second duration; disable audio
if the chosen Magnific tool supports it.

## Connector prompt

Use the previous dive's extracted final frame as the start image and the next dive's
extracted first frame as the end image. Both must be from rendered videos, never stills.

```text
Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back
out of [SCENE i], rising into the sky, then glides forward across the connected miniature
world and arrives above [SCENE i+1], beginning to descend toward it. One connected
miniature world, seamless flowing aerial transition. [STYLE tail + PALETTE]. Smooth,
graceful slow motion. No text, no captions.
```

For the final connector, dissolve toward the giant hero product. Request 16:9 and about
five seconds. This requires an end-image-capable Magnific video operation.

## Copy per section

- `eyebrow`: 2–4 words, a compact value label.
- `title`: 3–6 words; the last scene carries the CTA.
- `body`: one visitor-centred sentence.
- `tags`: 0–3 short proof chips.
