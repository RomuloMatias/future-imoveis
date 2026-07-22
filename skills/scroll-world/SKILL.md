---
name: scroll-world
description: >
  Build an immersive, scroll-scrubbed fly-through landing page using Magnific through
  its MCP server. Generate cohesive scene stills and seamless start/end-image-conditioned
  camera clips, then wire the portable framework-agnostic scroll engine. Use for a 3D
  world hero, scroll cinematic, diorama landing page, or browse-through industry story.
allowed-tools: Bash, Read, Write, Edit, AskUserQuestion, Skill
---

# scroll-world

Build a landing page in which scroll position drives a pre-rendered camera flight through
connected scenes. The page only scrubs video; the camera movement is generated with
Magnific via MCP.

The required chain is: `N` stills → `N` dive clips → `N-1` connector clips → the scroll
engine. A connector must start and end on frames extracted from its neighbouring rendered
clips. This frame handoff is non-negotiable: do not use source stills as connector inputs.

## Step 0 — connect Magnific

The target agent must expose the `magnific` MCP server before any generation. Configure
it with the appropriate client command:

```bash
# Codex
codex mcp add --transport http magnific https://mcp.magnific.com

# Claude Code
claude mcp add --transport http magnific https://mcp.magnific.com
```

In VS Code, add `https://mcp.magnific.com` as the MCP server URL. Complete the interactive
Magnific authentication flow if requested by the provider.

Inspect the exposed Magnific tools before proposing a render. Use the tool schemas as the
source of truth for available models, media inputs, dimensions, duration, pricing, status,
and download fields. Never assume legacy Higgsfield model names or CLI flags.

For this skill to ship a seamless multi-scene chain, the selected Magnific video operation
must accept a start image for dives and **both start and end images** for connectors. If
no such operation is available, explain that a seamless chain cannot be guaranteed and do
not silently substitute a reference-only model.

Also require `ffmpeg`/`ffprobe`. Python with Pillow is optional for transparent-scene
knockout. Codex `image_gen` may remain an optional source for stills, but Magnific is the
default image and video provider.

## Step 1 — interview and budget

Ask the user, in plain prose, for the subject and one-line pitch. Then establish:

1. Brand kit: import it from a site only if a Magnific tool supports that action, accept
   palette/name/tone directly, or propose a kit for approval.
2. Art direction: default to a soft matte low-poly clay diorama; alternatives include
   papercraft, glossy toy, claymation, neon night, and photoreal architecture.
3. An ordered journey of 5–7 scenes. For each capture an id, scene subject, eyebrow,
   headline, one-sentence body, and 0–3 tags.
4. Whether a native mobile 9:16 chain is wanted. Always ask: it is a second render chain,
   not a crop, and roughly doubles video usage.
5. The proposed Magnific image/video operations and their current quoted usage. State the
   total estimate — `N` stills plus `2N-1` videos, doubled for native mobile — and obtain
   approval before generating.

Put all selected parameters in a short project manifest or work log so each generation
uses the same choices. See `references/prompts.md` for the intake fields.

## Step 2 — generate and review stills

Write one prompt per scene. Reuse the identical style preamble byte-for-byte, then use the
available Magnific image-generation tool for 3:2 landscape stills. Save each returned
image locally and review the entire collection for a shared palette, camera angle, and
light before continuing. Re-render individual outliers only.

Use `references/knockout.py` only when the user wants floating scenes over an atmospheric
site background. Preserve the solid source PNG even if a transparent webp is made: it is
also the dive clip's start frame and the fallback poster.

## Step 3 — generate dives and connectors

For every scene, call the selected Magnific video tool using its matching prompt and the
scene PNG as its start image. Use landscape 16:9 and an 8–10 second continuous forward
move. Download each completed clip locally.

Extract each dive's first and last frames with `ffmpeg`. For every adjacent pair, create
a connector with the rendered previous last frame as start image and next first frame as
end image. Request a short, continuous aerial transition. Inspect each seam at normal and
slow playback; rerender a bad clip before encoding.

`references/pipeline.md` gives the exact local file layout, frame extraction, and encoding
commands. Tool calls are intentionally described by capability rather than invented MCP
method names.

## Step 4 — mobile and integration

If native mobile was approved, build a separate 9:16 chain: portrait start canvases,
portrait dives, frames extracted from those portrait dives, portrait connectors, and
portrait posters. Do not mix portrait clips into the landscape chain. If budget permits
only centre crops, label them as a fallback and get explicit approval.

Encode clips with a small GOP for responsive seeking, then configure
`references/scrub-engine.js` with the ordered dive clips and connectors. Use
`references/index-template.html` as the standalone integration starting point.

## Quality gates and recovery

- Verify the MCP connection and the chosen video tool's start/end-image capability before
  spending on a full chain.
- Confirm every downloaded asset is present and probe its actual dimensions before encode.
- Keep retries limited to the failed asset; never restart completed batches.
- Treat provider safety rejections and temporary job errors as per-asset retries. Adjust
  the offending prompt, or choose another Magnific operation only after confirming it
  supports the same seam inputs.
- Test scroll seeking on desktop and a real or emulated phone before delivery.
