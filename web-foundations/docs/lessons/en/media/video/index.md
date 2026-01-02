---
layout: lesson
title: 'Video on the Web – From HTML5 to Production-Ready Experiences'
title_alt: 'Video en la Web – De HTML5 a Experiencias Listas para Producción'
slug: video-on-web
date: 2026-01-02
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/media/video/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Estimated Duration

180 minutes (3 sessions or 2 extended workshops)

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:

- **Understand** the evolution of video on the web and current best practices
- **Implement** native HTML5 video with proper accessibility features
- **Optimize** video delivery for performance across devices and networks
- **Apply** responsive and fluid video techniques using CSS
- **Integrate** third-party video platforms (YouTube, Vimeo) semantically
- **Evaluate** when to use native video vs. external libraries
- **Create** accessible, performant video experiences that respect user preferences

---

## 🎭 Atelier Approach: Learning Through Production

Following our [atelier methodology]({{ '/methodology/en/' | absolute_url }}), this lesson embraces video as a **creative medium** through hands-on production:

1. **🔍 Exploration** → Experiment with each video technique in isolated demos
2. **💭 Reflection** → Understand the technical and artistic decisions behind video integration
3. **📚 Conceptualization** → Connect practice to web standards, accessibility, and performance theory
4. **🛠️ Production** → Apply video techniques to your personal projects
5. **🎪 Exhibition** → Showcase and critique video implementations in your work

> **Video is not just content—it's an experience.**
> Every video should load fast, play smoothly, and be accessible to all users regardless of ability or device.

---

## 📖 Introduction

Video has transformed from a bandwidth-heavy luxury to an essential medium for web communication. From hero backgrounds to educational content, tutorials to product showcases, video engages users in ways static content cannot. However, with great power comes great responsibility: video done poorly can cripple page performance, exclude users with disabilities, and frustrate visitors on slow connections.

This lesson covers the complete landscape of web video—from HTML5 fundamentals to advanced optimization techniques, from accessibility requirements to cutting-edge responsive approaches.

---

## 🎬 The Tao of the Moving Image

> _"In the ancient scrolls of web development, there exists a sacred text known as 'The Tao of the Developer'—a collection of paradoxical wisdom passed down through generations of code warriors. This chapter, dedicated to the art of motion and time, reveals the eternal truths about video in the digital realm."_

The philosophical wisdom of video on the web has been collected in a separate lesson: **[The Tao of the Moving Image]({{ '/lessons/en/media/video/the-tao-of-moving-images/' | absolute_url }})**. Throughout this lesson, you'll find quotes from the Tao that illuminate each section's core principles.

---

### A Brief History

| Era          | Technology                    | Characteristics                          |
| ------------ | ----------------------------- | ---------------------------------------- |
| 1990s-2000s  | RealPlayer, QuickTime         | Plugins required, proprietary formats    |
| 2005-2014    | Flash Video (FLV)             | Dominated web video, security nightmares |
| 2010-present | HTML5 `<video>`               | Native browser support, no plugins       |
| 2015-present | Adaptive Streaming (HLS/DASH) | Quality adjusts to connection speed      |
| 2020-present | AV1, AVIF                     | Next-gen codecs, superior compression    |

> **Historical Note**: Flash's death in 2020 wasn't just a technology shift—it was a victory for open standards, accessibility, and security. The web learned that proprietary plugins create fragility[^1].

[^1]: Adobe. (2020). "Adobe Flash Player End of Life." https://www.adobe.com/products/flashplayer/end-of-life.html

---

## 🎓 Part I: HTML5 Video Fundamentals

> _"The longest video loads instantly when never played. The shortest video crushes the user when poorly encoded."_ — [The Tao of the Moving Image: On Video Optimization]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-video-optimization' | absolute_url }})

### **1. The `<video>` Element**

**📂 Demo:** [demo/01-basic-video.html]({{ '/lessons/en/media/video/demo/01-basic-video.html' | absolute_url }})

The HTML5 `<video>` element provides native video playback without plugins. It's semantic, accessible, and controllable via JavaScript.

#### Basic Syntax

```html
<video src="video.mp4" controls width="640" height="360" poster="thumbnail.jpg">
	<p>
		Your browser doesn't support HTML5 video.
		<a href="video.mp4">Download the video</a>
		instead.
	</p>
</video>
```

#### Essential Attributes

> _"Autoplay without sound is respect. Autoplay with sound is assault. The user who does not choose to hear does not consent to hear."_ — [The Tao of the Moving Image: On Autoplay and Control]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-autoplay-and-control' | absolute_url }})

| Attribute     | Purpose                      | Values                     |
| ------------- | ---------------------------- | -------------------------- |
| `src`         | Video source URL             | URL path                   |
| `controls`    | Show playback controls       | Boolean                    |
| `autoplay`    | Start playing automatically  | Boolean (use cautiously!)  |
| `muted`       | Mute audio by default        | Boolean                    |
| `loop`        | Replay when finished         | Boolean                    |
| `poster`      | Thumbnail image before play  | URL path                   |
| `preload`     | Hint for preloading strategy | `none`, `metadata`, `auto` |
| `playsinline` | Play inline on iOS           | Boolean                    |

#### The Fallback Pattern

Always provide fallback content for browsers that don't support the video format or the `<video>` element:

```html
<video controls poster="poster.jpg">
	<source src="video.webm" type="video/webm" />
	<source src="video.mp4" type="video/mp4" />
	<source src="video.ogv" type="video/ogg" />

	<!-- Fallback for no video support -->
	<p>
		Your browser doesn't support HTML5 video.
		<a href="video.mp4">Download the video</a>
		(MP4, 12MB).
	</p>
</video>
```

---

### **2. Video Formats and Codecs**

> _"MP4 for compatibility, WebM for openness, AV1 for the future. Know the nature of each, and choose with wisdom."_ — [The Tao of the Moving Image: On Video Formats]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-video-formats' | absolute_url }})

**📂 Demo:** [demo/02-formats-comparison.html]({{ '/lessons/en/media/video/demo/02-formats-comparison.html' | absolute_url }})

Understanding video formats is crucial for balancing quality, compatibility, and file size.

#### Container Formats vs. Codecs

- **Container** (`.mp4`, `.webm`, `.mov`): The "box" that holds video, audio, and metadata
- **Codec** (H.264, VP9, AV1): The algorithm that compresses/decompresses the video data

#### Format Comparison

| Format   | Container | Video Codec | Audio Codec | Browser Support       | Best For                       |
| -------- | --------- | ----------- | ----------- | --------------------- | ------------------------------ |
| MP4      | MPEG-4    | H.264/AVC   | AAC         | Universal             | Maximum compatibility          |
| WebM     | WebM      | VP8/VP9     | Vorbis/Opus | Chrome, Firefox, Edge | Open source projects           |
| MP4      | MPEG-4    | H.265/HEVC  | AAC         | Safari, some Chrome   | 4K, HDR content                |
| MP4/WebM | —         | AV1         | Opus        | Modern browsers       | Future-proof, best compression |
| OGG      | Ogg       | Theora      | Vorbis      | Firefox, Chrome       | Legacy open source             |

#### The Modern Format Strategy

```html
<video controls>
	<!-- Serve AV1 to browsers that support it (best compression) -->
	<source src="video.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />

	<!-- VP9 for browsers without AV1 support -->
	<source src="video.webm" type='video/webm; codecs="vp9, opus"' />

	<!-- H.264 as universal fallback -->
	<source src="video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
</video>
```

> **Pro Tip**: Use tools like FFmpeg or Handbrake for transcoding. For production, consider cloud services like Cloudinary, Mux, or AWS MediaConvert that handle multi-format encoding automatically[^2].

[^2]: Mux. (2024). "Video Encoding Best Practices." https://docs.mux.com/guides/video/minimize-latency

---

### **3. The `preload` Attribute Deep Dive**

> _"Preload metadata, not megabytes. The user who waits for metadata is patient. The user who waits for megabytes is gone."_ — [The Tao of the Moving Image: On Performance and Loading]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-performance-and-loading' | absolute_url }})

**📂 Demo:** [demo/03-preload-strategies.html]({{ '/lessons/en/media/video/demo/03-preload-strategies.html' | absolute_url }})

The `preload` attribute hints to the browser how much video data to fetch before the user hits play.

```html
<!-- Don't preload anything - saves bandwidth -->
<video src="video.mp4" preload="none" controls></video>

<!-- Preload only metadata (duration, dimensions) - balanced approach -->
<video src="video.mp4" preload="metadata" controls></video>

<!-- Preload entire video - only for critical content -->
<video src="video.mp4" preload="auto" controls></video>
```

#### When to Use Each Strategy

| Strategy   | Data Downloaded                        | Use Case                                      |
| ---------- | -------------------------------------- | --------------------------------------------- |
| `none`     | Nothing                                | Below-fold videos, galleries with many videos |
| `metadata` | ~100KB-500KB                           | Most scenarios, hero videos                   |
| `auto`     | Entire video (at browser's discretion) | Above-fold critical content, short videos     |

> **Performance Warning**: `preload="auto"` on multiple videos can devastate mobile data plans and slow page loads. The [HTTP Archive](https://httparchive.org/) reports video as the largest median resource on media-heavy sites[^3].

[^3]: HTTP Archive. (2024). "State of Images and Video." https://httparchive.org/reports/state-of-images

---

## 🎨 Part II: Responsive & Fluid Video

> _"Aspect ratio is not decoration—it is respect. Respect for the mobile user's screen. Respect for the desktop user's viewport."_ — [The Tao of the Moving Image: On Responsive Video]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-responsive-video' | absolute_url }})

### **4. Fluid Video with CSS**

**📂 Demo:** [demo/04-fluid-video.html]({{ '/lessons/en/media/video/demo/04-fluid-video.html' | absolute_url }})

Making video responsive requires maintaining aspect ratio while filling available width.

#### The Classic Padding-Bottom Trick

```css
/* Container maintains aspect ratio */
.video-wrapper {
	position: relative;
	width: 100%;
	padding-bottom: 56.25%; /* 16:9 = 9/16 = 0.5625 */
	height: 0;
	overflow: hidden;
}

.video-wrapper video,
.video-wrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover; /* or 'contain' */
}
```

#### The Modern Approach: `aspect-ratio`

```css
/* Modern CSS - much cleaner! */
.video-wrapper {
	width: 100%;
	aspect-ratio: 16 / 9;
}

.video-wrapper video {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
```

#### Common Aspect Ratios

| Ratio | `aspect-ratio` | `padding-bottom` | Use Case                      |
| ----- | -------------- | ---------------- | ----------------------------- |
| 16:9  | `16 / 9`       | 56.25%           | Standard HD/4K, YouTube       |
| 4:3   | `4 / 3`        | 75%              | Classic TV, some webcams      |
| 21:9  | `21 / 9`       | 42.86%           | Cinematic widescreen          |
| 1:1   | `1 / 1`        | 100%             | Instagram, social media       |
| 9:16  | `9 / 16`       | 177.78%          | Vertical/mobile video, TikTok |

---

### **5. Art Direction with `<source>` and `media`**

> _"The master writes: `<video><source media="...">`. The novice writes: `<video src="huge-video.mp4">`. The user pays the price."_ — [The Tao of the Moving Image: On Responsive Video]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-responsive-video' | absolute_url }})

**📂 Demo:** [demo/05-art-direction.html]({{ '/lessons/en/media/video/demo/05-art-direction.html' | absolute_url }})

Serve different video crops or edits based on viewport size—similar to the `<picture>` element for images.

```html
<video controls poster="poster-desktop.jpg">
	<!-- Vertical video for mobile -->
	<source src="video-vertical.mp4" type="video/mp4" media="(max-width: 767px) and (orientation: portrait)" />

	<!-- Square video for tablet -->
	<source src="video-square.mp4" type="video/mp4" media="(min-width: 768px) and (max-width: 1023px)" />

	<!-- Widescreen for desktop -->
	<source src="video-widescreen.mp4" type="video/mp4" media="(min-width: 1024px)" />

	<!-- Fallback -->
	<source src="video-standard.mp4" type="video/mp4" />
</video>
```

> **Design Consideration**: Creating multiple video crops requires additional production work, but dramatically improves the mobile experience for hero videos and backgrounds[^4].

[^4]: Smashing Magazine. (2021). "Responsive Video Design." https://www.smashingmagazine.com/2021/02/responsive-video-techniques/

---

### **6. Video as Background**

> _"Background video must be silent. Background video must be short. Background video must be optional. This is the three-fold law."_ — [The Tao of the Moving Image: On Background Video]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-background-video' | absolute_url }})

**📂 Demo:** [demo/06-video-background.html]({{ '/lessons/en/media/video/demo/06-video-background.html' | absolute_url }})

Background videos can create immersive experiences when used responsibly.

#### HTML Structure

```html
<section class="hero">
	<video class="hero__video" autoplay muted loop playsinline poster="hero-poster.jpg">
		<source src="hero-bg.webm" type="video/webm" />
		<source src="hero-bg.mp4" type="video/mp4" />
	</video>

	<div class="hero__content">
		<h1>Welcome to Our Site</h1>
		<p>Experience the future today</p>
	</div>
</section>
```

#### CSS Styling

```css
.hero {
	position: relative;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.hero__video {
	position: absolute;
	top: 50%;
	left: 50%;
	min-width: 100%;
	min-height: 100%;
	transform: translate(-50%, -50%);
	object-fit: cover;
	z-index: -1;
}

/* Overlay for text readability */
.hero::after {
	content: '';
	position: absolute;
	inset: 0;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
	z-index: 0;
}

.hero__content {
	position: relative;
	z-index: 1;
	color: white;
	text-align: center;
}
```

#### Critical Requirements for Background Video

| Requirement          | Reason                                 |
| -------------------- | -------------------------------------- |
| `autoplay` + `muted` | Browsers block autoplay with sound     |
| `playsinline`        | Prevents fullscreen on iOS             |
| `loop`               | Seamless continuous playback           |
| `poster`             | Shows before video loads               |
| Overlay              | Ensures text remains readable          |
| Short duration       | 10-30 seconds max, keep file size down |

> **Accessibility Warning**: Background videos with motion can trigger vestibular disorders. Always provide a pause control and respect `prefers-reduced-motion`[^5].

[^5]: W3C. (2023). "Understanding WCAG 2.2: Pause, Stop, Hide." https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html

---

## ♿ Part III: Accessibility

> _"A video without captions is a locked door to the deaf user. You would not build a website with only locked doors."_ — [The Tao of the Moving Image: On Captions and Accessibility]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-captions-and-accessibility' | absolute_url }})

### **7. Captions and Subtitles with `<track>`**

**📂 Demo:** [demo/07-captions.html]({{ '/lessons/en/media/video/demo/07-captions.html' | absolute_url }})

The `<track>` element provides text tracks for captions, subtitles, descriptions, and more.

#### Basic Implementation

```html
<video controls>
	<source src="lecture.mp4" type="video/mp4" />

	<!-- Captions (same language, includes non-speech audio) -->
	<track kind="captions" src="lecture-en.vtt" srclang="en" label="English" default />

	<!-- Subtitles (translation) -->
	<track kind="subtitles" src="lecture-es.vtt" srclang="es" label="Español" />

	<!-- Audio descriptions for blind users -->
	<track kind="descriptions" src="lecture-descriptions.vtt" srclang="en" label="Audio Descriptions" />

	<!-- Chapters for navigation -->
	<track kind="chapters" src="lecture-chapters.vtt" srclang="en" label="Chapters" />
</video>
```

#### Track Kinds Explained

| Kind           | Purpose                     | Audience                                    |
| -------------- | --------------------------- | ------------------------------------------- |
| `captions`     | Dialogue + sound effects    | Deaf/hard of hearing, anyone watching muted |
| `subtitles`    | Translation of dialogue     | Non-native speakers                         |
| `descriptions` | Narration of visual content | Blind/low-vision users                      |
| `chapters`     | Navigation markers          | All users (improves UX)                     |
| `metadata`     | Machine-readable data       | JavaScript applications                     |

#### WebVTT Format

WebVTT (Web Video Text Tracks) is the standard caption format:

```vtt
WEBVTT

00:00:00.000 --> 00:00:04.000
Welcome to this tutorial on web video.

00:00:04.500 --> 00:00:08.000
Today we'll cover accessibility best practices.

00:00:08.500 --> 00:00:12.000 position:10%,line-left align:left
[Typing sounds]

00:00:12.500 --> 00:00:16.000
Let's start with captions and subtitles.
```

#### Styling Captions with CSS

```css
/* Modern browsers support ::cue pseudo-element */
video::cue {
	background: rgba(0, 0, 0, 0.8);
	color: #fff;
	font-family: 'Atkinson Hyperlegible', sans-serif;
	font-size: 1.2em;
	line-height: 1.4;
}

video::cue(b) {
	color: #ffeb3b; /* Highlight emphasized text */
}
```

> **Legal Note**: In many jurisdictions (US Section 508, EU EN 301 549), captions are legally required for video content on government and education websites[^6].

[^6]: Section508.gov. (2024). "Video and Multimedia Requirements." https://www.section508.gov/create/video-multimedia/

---

### **8. Respecting User Preferences**

> _"Respect `prefers-reduced-motion`. Some users find motion uncomfortable. Your video is not worth their discomfort."_ — [The Tao of the Moving Image: On Accessibility & Ethics]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-accessibility--ethics' | absolute_url }})

**📂 Demo:** [demo/08-reduced-motion.html]({{ '/lessons/en/media/video/demo/08-reduced-motion.html' | absolute_url }})

Some users experience motion sickness or seizures from video content. Always provide controls.

#### CSS Media Query

```css
/* Pause background video for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
	.hero__video {
		display: none;
	}

	.hero {
		background-image: url('hero-poster.jpg');
		background-size: cover;
		background-position: center;
	}
}
```

#### JavaScript Enhancement

```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const video = document.querySelector('.hero__video');

if (prefersReducedMotion) {
	video.pause();
	video.currentTime = 0; // Show first frame
} else {
	video.play();
}

// Also provide a manual toggle
const toggleBtn = document.querySelector('.video-toggle');
toggleBtn.addEventListener('click', () => {
	if (video.paused) {
		video.play();
		toggleBtn.textContent = 'Pause Background';
		toggleBtn.setAttribute('aria-pressed', 'true');
	} else {
		video.pause();
		toggleBtn.textContent = 'Play Background';
		toggleBtn.setAttribute('aria-pressed', 'false');
	}
});
```

---

## ⚡ Part IV: Performance Optimization

> _"Lazy loading is not laziness—it is wisdom. Load the video when the user is ready, not when the page is ready."_ — [The Tao of the Moving Image: On Performance and Loading]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-performance-and-loading' | absolute_url }})

### **9. Lazy Loading Video**

**📂 Demo:** [demo/09-lazy-loading.html]({{ '/lessons/en/media/video/demo/09-lazy-loading.html' | absolute_url }})

Don't load video until users are about to see it.

#### Native Lazy Loading (Limited Support)

```html
<!-- Works in some browsers -->
<video loading="lazy" preload="none" controls>
	<source src="video.mp4" type="video/mp4" />
</video>
```

#### Intersection Observer Approach (Recommended)

```html
<video data-src="video.mp4" poster="thumbnail.jpg" preload="none" controls>
	<!-- Source added via JavaScript -->
</video>
```

```javascript
const videoObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const video = entry.target;
				const source = document.createElement('source');
				source.src = video.dataset.src;
				source.type = 'video/mp4';
				video.appendChild(source);
				video.load();
				videoObserver.unobserve(video);
			}
		});
	},
	{
		rootMargin: '200px 0px', // Load when 200px from viewport
	}
);

document.querySelectorAll('video[data-src]').forEach((video) => {
	videoObserver.observe(video);
});
```

---

### **10. Adaptive Bitrate Streaming (HLS/DASH)**

**📂 Demo:** [demo/10-adaptive-streaming.html]({{ '/lessons/en/media/video/demo/10-adaptive-streaming.html' | absolute_url }})

For longer videos, adaptive streaming automatically adjusts quality based on network conditions.

#### HLS (HTTP Live Streaming)

Developed by Apple, HLS is the most widely supported format.

```html
<!-- Native HLS support in Safari -->
<video controls>
	<source src="video.m3u8" type="application/x-mpegURL" />
</video>
```

For other browsers, use a library like hls.js:

```html
<video id="video" controls></video>

<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script>
	const video = document.getElementById('video');
	const hlsUrl = 'https://example.com/video.m3u8';

	if (Hls.isSupported()) {
		const hls = new Hls();
		hls.loadSource(hlsUrl);
		hls.attachMedia(video);
	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		// Native HLS support (Safari)
		video.src = hlsUrl;
	}
</script>
```

#### DASH (Dynamic Adaptive Streaming over HTTP)

An open standard alternative:

```javascript
// Using dash.js
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector('video'), 'https://example.com/video.mpd', true);
```

> **When to Use Adaptive Streaming**:
>
> - Videos longer than 2-3 minutes
> - Users on varying network conditions
> - High-quality content (1080p+)
> - Live streaming scenarios

---

### **11. Compression and Encoding Best Practices**

**📂 Reference:** Technical encoding guide

#### Recommended Encoding Settings

**For H.264 (Maximum Compatibility):**

```bash
ffmpeg -i input.mov \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -profile:v high \
  -level 4.0 \
  -movflags +faststart \
  -c:a aac \
  -b:a 128k \
  output.mp4
```

**For VP9 (Better Compression):**

```bash
ffmpeg -i input.mov \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -c:a libopus \
  -b:a 128k \
  output.webm
```

**For AV1 (Best Compression, Slow Encode):**

```bash
ffmpeg -i input.mov \
  -c:v libaom-av1 \
  -crf 30 \
  -b:v 0 \
  -c:a libopus \
  -b:a 128k \
  output.av1.mp4
```

#### Key Parameters Explained

| Parameter              | Purpose                        | Recommendation             |
| ---------------------- | ------------------------------ | -------------------------- |
| `-crf`                 | Quality (0-51, lower = better) | 18-28 for web              |
| `-preset`              | Speed vs compression tradeoff  | `slow` or `medium`         |
| `-movflags +faststart` | Enable progressive loading     | Always use for web         |
| `-profile:v`           | Compatibility profile          | `high` for modern browsers |

> **File Size Guidelines**:
>
> - Hero background (10-15s): 2-5 MB
> - Product video (30-60s): 5-15 MB
> - Tutorial (5-10 min): 50-150 MB (use adaptive streaming)[^7]

[^7]: Web.dev. (2023). "Video Compression for the Web." https://web.dev/articles/video-compression

---

## 🔗 Part V: Third-Party Embeds

> _"The facade pattern is not deception—it is respect. Show the thumbnail, load the player on demand. This is the way."_ — [The Tao of the Moving Image: On Third-Party Embeds]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-third-party-embeds' | absolute_url }})

### **12. YouTube Embeds**

**📂 Demo:** [demo/12-youtube-embed.html]({{ '/lessons/en/media/video/demo/12-youtube-embed.html' | absolute_url }})

YouTube is the dominant video platform. Embedding correctly improves performance and privacy.

#### Basic Embed

```html
<iframe
	src="https://www.youtube.com/embed/dQw4w9WgXcQ"
	title="Video Title - Descriptive title for accessibility"
	width="560"
	height="315"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
	loading="lazy"></iframe>
```

#### Privacy-Enhanced Mode

Use `youtube-nocookie.com` to avoid tracking cookies until play:

```html
<iframe
	src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
	title="Video Title"
	loading="lazy"
	allowfullscreen></iframe>
```

#### Performance: Facade Pattern (Lite YouTube Embed)

YouTube iframes load ~1MB of resources. Use a facade pattern for better performance:

```html
<!-- Using lite-youtube-embed library -->
<script type="module" src="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.3.0/src/lite-yt-embed.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.3.0/src/lite-yt-embed.css" />

<lite-youtube videoid="dQw4w9WgXcQ" playlabel="Play: Video Title">
	<a href="https://youtube.com/watch?v=dQw4w9WgXcQ" class="lyt-playbtn">
		<span class="lyt-visually-hidden">Play Video</span>
	</a>
</lite-youtube>
```

> **Performance Impact**: The facade pattern can reduce initial page weight from ~1MB to ~10KB for each embedded video[^8].

[^8]: Osmani, A. (2022). "The Import On Interaction Pattern." https://www.patterns.dev/vanilla/import-on-interaction/

---

### **13. Vimeo Embeds**

**📂 Demo:** [demo/13-vimeo-embed.html]({{ '/lessons/en/media/video/demo/13-vimeo-embed.html' | absolute_url }})

Vimeo offers a cleaner, more professional aesthetic.

```html
<iframe
	src="https://player.vimeo.com/video/VIDEO_ID?h=HASH&title=0&byline=0&portrait=0"
	title="Video Title"
	width="640"
	height="360"
	frameborder="0"
	allow="autoplay; fullscreen; picture-in-picture"
	allowfullscreen
	loading="lazy"></iframe>
```

#### Vimeo Player API

```html
<script src="https://player.vimeo.com/api/player.js"></script>

<div id="vimeo-player" data-vimeo-id="VIDEO_ID"></div>

<script>
	const player = new Vimeo.Player('vimeo-player', {
		id: VIDEO_ID,
		width: 640,
		responsive: true,
	});

	player.on('play', () => console.log('Video started'));
	player.on('ended', () => console.log('Video finished'));
</script>
```

---

### **14. Self-Hosting vs. Third-Party Platforms**

| Factor          | Self-Hosted                      | YouTube/Vimeo                   |
| --------------- | -------------------------------- | ------------------------------- |
| **Control**     | Full control over player, design | Limited customization           |
| **Cost**        | CDN/bandwidth costs              | Free (with ads) or subscription |
| **Performance** | You manage optimization          | Optimized globally              |
| **Privacy**     | GDPR-friendly                    | Tracking concerns               |
| **Analytics**   | Custom implementation            | Built-in analytics              |
| **SEO**         | Direct benefit to your site      | Benefit goes to platform        |
| **Reliability** | Your infrastructure              | Platform uptime                 |

> **Recommendation**: Use third-party platforms for user-generated content, tutorials, and promotional videos. Self-host for hero backgrounds, product demos, and when privacy is critical[^9].

[^9]: CSS-Tricks. (2022). "Self-Hosted Video vs YouTube Embed." https://css-tricks.com/videos/

---

## 🔧 Part VI: JavaScript Video API

> _"Give the user a pause button. Give them a mute button. Give them control. This is the three-fold path to respect."_ — [The Tao of the Moving Image: On Autoplay and Control]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-autoplay-and-control' | absolute_url }})

### **15. The HTMLVideoElement API**

**📂 Demo:** [demo/15-video-api.html]({{ '/lessons/en/media/video/demo/15-video-api.html' | absolute_url }})

The JavaScript API provides complete control over video playback.

#### Essential Properties

```javascript
const video = document.querySelector('video');

// Read-only properties
console.log(video.duration); // Total length in seconds
console.log(video.currentTime); // Current playback position
console.log(video.paused); // Is video paused?
console.log(video.ended); // Has video finished?
console.log(video.readyState); // 0-4, loading state
console.log(video.networkState); // Network activity
console.log(video.videoWidth); // Native video width
console.log(video.videoHeight); // Native video height

// Writable properties
video.currentTime = 30; // Seek to 30 seconds
video.volume = 0.5; // 50% volume
video.muted = true; // Mute
video.playbackRate = 1.5; // 1.5x speed
```

#### Essential Methods

```javascript
// Playback control
video.play(); // Returns Promise
video.pause();
video.load(); // Reload sources

// Play with error handling
async function safePlay() {
	try {
		await video.play();
		console.log('Playing');
	} catch (error) {
		if (error.name === 'NotAllowedError') {
			console.log('Autoplay blocked - need user interaction');
		}
	}
}
```

#### Essential Events

```javascript
video.addEventListener('loadedmetadata', () => {
	console.log(`Duration: ${video.duration}s`);
});

video.addEventListener('canplay', () => {
	console.log('Ready to play');
});

video.addEventListener('play', () => {
	console.log('Started playing');
});

video.addEventListener('pause', () => {
	console.log('Paused');
});

video.addEventListener('ended', () => {
	console.log('Finished');
});

video.addEventListener('timeupdate', () => {
	// Fires frequently during playback
	const progress = (video.currentTime / video.duration) * 100;
	progressBar.style.width = `${progress}%`;
});

video.addEventListener('error', (e) => {
	console.error('Video error:', video.error.message);
});
```

---

### **16. Building a Custom Video Player**

> _"The video without a pause button is not engagement—it is imprisonment. The user must always have control."_ — [The Tao of the Moving Image: On Accessibility & Ethics]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-accessibility--ethics' | absolute_url }})

**📂 Demo:** [demo/16-custom-player.html]({{ '/lessons/en/media/video/demo/16-custom-player.html' | absolute_url }})

Create accessible, branded video controls.

#### HTML Structure

```html
<div class="video-player" role="region" aria-label="Video player">
	<video id="video" src="video.mp4" poster="poster.jpg" preload="metadata">
		<track kind="captions" src="captions.vtt" srclang="en" label="English" />
	</video>

	<div class="video-controls" role="toolbar" aria-label="Video controls">
		<button class="play-btn" aria-label="Play" aria-pressed="false">
			<span class="icon-play">▶</span>
			<span class="icon-pause" hidden>⏸</span>
		</button>

		<div class="progress-container">
			<input type="range" class="progress-bar" value="0" min="0" max="100" aria-label="Video progress" />
			<span class="time-display">
				<span class="current-time">0:00</span>
				<span class="separator">/</span>
				<span class="duration">0:00</span>
			</span>
		</div>

		<button class="mute-btn" aria-label="Mute" aria-pressed="false">🔊</button>

		<input type="range" class="volume-slider" min="0" max="100" value="100" aria-label="Volume" />

		<button class="cc-btn" aria-label="Captions" aria-pressed="false">CC</button>

		<button class="fullscreen-btn" aria-label="Enter fullscreen">⛶</button>
	</div>
</div>
```

#### CSS Styling

```css
.video-player {
	--player-bg: #000;
	--controls-bg: rgba(0, 0, 0, 0.85);
	--accent-color: #e91e63;
	--text-color: #fff;

	position: relative;
	width: 100%;
	max-width: 1200px;
	aspect-ratio: 16 / 9;
	background: var(--player-bg);
	border-radius: 8px;
	overflow: hidden;
}

.video-player video {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.video-controls {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 16px;
	background: var(--controls-bg);
	transform: translateY(100%);
	transition: transform 0.3s ease;
}

.video-player:hover .video-controls,
.video-player:focus-within .video-controls {
	transform: translateY(0);
}

.video-controls button {
	background: transparent;
	border: none;
	color: var(--text-color);
	cursor: pointer;
	padding: 8px;
	border-radius: 4px;
	font-size: 1.25rem;
	transition: background-color 0.2s;
}

.video-controls button:hover,
.video-controls button:focus {
	background: rgba(255, 255, 255, 0.1);
}

.progress-container {
	flex: 1;
	display: flex;
	align-items: center;
	gap: 12px;
}

.progress-bar {
	flex: 1;
	-webkit-appearance: none;
	appearance: none;
	height: 4px;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 2px;
	cursor: pointer;
}

.progress-bar::-webkit-slider-thumb {
	-webkit-appearance: none;
	width: 16px;
	height: 16px;
	background: var(--accent-color);
	border-radius: 50%;
	cursor: pointer;
}

.time-display {
	font-family: 'JetBrains Mono', monospace;
	font-size: 0.875rem;
	color: var(--text-color);
	min-width: 100px;
}
```

#### JavaScript Controller

```javascript
class VideoPlayer {
	constructor(container) {
		this.container = container;
		this.video = container.querySelector('video');
		this.playBtn = container.querySelector('.play-btn');
		this.muteBtn = container.querySelector('.mute-btn');
		this.progressBar = container.querySelector('.progress-bar');
		this.volumeSlider = container.querySelector('.volume-slider');
		this.currentTimeDisplay = container.querySelector('.current-time');
		this.durationDisplay = container.querySelector('.duration');
		this.ccBtn = container.querySelector('.cc-btn');
		this.fullscreenBtn = container.querySelector('.fullscreen-btn');

		this.init();
	}

	init() {
		// Play/Pause
		this.playBtn.addEventListener('click', () => this.togglePlay());
		this.video.addEventListener('click', () => this.togglePlay());

		// Progress
		this.video.addEventListener('timeupdate', () => this.updateProgress());
		this.video.addEventListener('loadedmetadata', () => this.updateDuration());
		this.progressBar.addEventListener('input', () => this.seek());

		// Volume
		this.muteBtn.addEventListener('click', () => this.toggleMute());
		this.volumeSlider.addEventListener('input', () => this.updateVolume());

		// Captions
		this.ccBtn.addEventListener('click', () => this.toggleCaptions());

		// Fullscreen
		this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

		// Keyboard shortcuts
		this.container.addEventListener('keydown', (e) => this.handleKeyboard(e));

		// Update state icons
		this.video.addEventListener('play', () => this.updatePlayState());
		this.video.addEventListener('pause', () => this.updatePlayState());
	}

	async togglePlay() {
		if (this.video.paused) {
			try {
				await this.video.play();
			} catch (error) {
				console.error('Playback failed:', error);
			}
		} else {
			this.video.pause();
		}
	}

	updatePlayState() {
		const isPlaying = !this.video.paused;
		this.playBtn.setAttribute('aria-pressed', isPlaying);
		this.playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
		this.playBtn.querySelector('.icon-play').hidden = isPlaying;
		this.playBtn.querySelector('.icon-pause').hidden = !isPlaying;
	}

	updateProgress() {
		const progress = (this.video.currentTime / this.video.duration) * 100;
		this.progressBar.value = progress;
		this.currentTimeDisplay.textContent = this.formatTime(this.video.currentTime);
	}

	updateDuration() {
		this.durationDisplay.textContent = this.formatTime(this.video.duration);
		this.progressBar.max = 100;
	}

	seek() {
		const time = (this.progressBar.value / 100) * this.video.duration;
		this.video.currentTime = time;
	}

	toggleMute() {
		this.video.muted = !this.video.muted;
		this.muteBtn.setAttribute('aria-pressed', this.video.muted);
		this.muteBtn.textContent = this.video.muted ? '🔇' : '🔊';
		this.volumeSlider.value = this.video.muted ? 0 : this.video.volume * 100;
	}

	updateVolume() {
		this.video.volume = this.volumeSlider.value / 100;
		this.video.muted = this.video.volume === 0;
	}

	toggleCaptions() {
		const tracks = this.video.textTracks;
		if (tracks.length > 0) {
			const track = tracks[0];
			track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
			this.ccBtn.setAttribute('aria-pressed', track.mode === 'showing');
		}
	}

	toggleFullscreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			this.container.requestFullscreen();
		}
	}

	handleKeyboard(e) {
		switch (e.key) {
			case ' ':
			case 'k':
				e.preventDefault();
				this.togglePlay();
				break;
			case 'ArrowLeft':
				this.video.currentTime -= 5;
				break;
			case 'ArrowRight':
				this.video.currentTime += 5;
				break;
			case 'ArrowUp':
				this.video.volume = Math.min(1, this.video.volume + 0.1);
				break;
			case 'ArrowDown':
				this.video.volume = Math.max(0, this.video.volume - 0.1);
				break;
			case 'm':
				this.toggleMute();
				break;
			case 'f':
				this.toggleFullscreen();
				break;
			case 'c':
				this.toggleCaptions();
				break;
		}
	}

	formatTime(seconds) {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
}

// Initialize
document.querySelectorAll('.video-player').forEach((container) => {
	new VideoPlayer(container);
});
```

---

## 📦 Part VII: Video Libraries (npm Ecosystem)

### **17. Plyr – Beautiful, Accessible Player**

**📂 Demo:** [demo/17-plyr.html]({{ '/lessons/en/media/video/demo/17-plyr.html' | absolute_url }})

[Plyr](https://plyr.io/) is a lightweight, accessible media player with consistent styling across browsers.

#### Installation

```bash
npm install plyr
```

#### Usage

```html
<video id="player" controls>
	<source src="video.mp4" type="video/mp4" />
	<track kind="captions" src="captions.vtt" srclang="en" label="English" />
</video>

<link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

<script>
	const player = new Plyr('#player', {
		controls: [
			'play-large',
			'restart',
			'rewind',
			'play',
			'fast-forward',
			'progress',
			'current-time',
			'duration',
			'mute',
			'volume',
			'captions',
			'settings',
			'pip',
			'airplay',
			'fullscreen',
		],
		settings: ['captions', 'quality', 'speed'],
		quality: {
			default: 720,
			options: [4320, 2160, 1440, 1080, 720, 576, 480, 360, 240],
		},
	});
</script>
```

---

### **18. Video.js – Enterprise-Grade Solution**

**📂 Demo:** [demo/18-videojs.html]({{ '/lessons/en/media/video/demo/18-videojs.html' | absolute_url }})

[Video.js](https://videojs.com/) is the most feature-rich open source player with a massive plugin ecosystem.

#### Installation

```bash
npm install video.js
```

#### Basic Setup

```html
<video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" poster="poster.jpg" data-setup="{}">
	<source src="video.mp4" type="video/mp4" />
	<track kind="captions" src="captions.vtt" srclang="en" label="English" />
	<p class="vjs-no-js">
		To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video
	</p>
</video>

<link href="https://vjs.zencdn.net/8.5.2/video-js.css" rel="stylesheet" />
<script src="https://vjs.zencdn.net/8.5.2/video.min.js"></script>
```

#### Advanced Configuration

```javascript
const player = videojs('my-video', {
	controls: true,
	autoplay: false,
	preload: 'auto',
	fluid: true, // Responsive
	responsive: true,
	playbackRates: [0.5, 1, 1.5, 2],
	controlBar: {
		skipButtons: {
			forward: 10,
			backward: 10,
		},
	},
	plugins: {
		// Your plugins here
	},
});

// HLS support with videojs-http-streaming (included)
player.src({
	src: 'https://example.com/video.m3u8',
	type: 'application/x-mpegURL',
});
```

#### Useful Video.js Plugins

| Plugin                           | Purpose                      |
| -------------------------------- | ---------------------------- |
| `videojs-contrib-quality-levels` | Quality selection UI         |
| `videojs-playlist`               | Playlist support             |
| `videojs-vr`                     | 360° video                   |
| `videojs-wavesurfer`             | Audio waveform visualization |
| `videojs-analytics`              | Analytics integration        |

---

### **19. MediaElement.js – Universal Player**

**📂 Demo:** [demo/19-mediaelement.html]({{ '/lessons/en/media/video/demo/19-mediaelement.html' | absolute_url }})

[MediaElement.js](https://www.mediaelementjs.com/) provides consistent UI with Flash/Silverlight fallbacks (legacy).

```bash
npm install mediaelement
```

```html
<video id="player" controls preload="metadata">
	<source src="video.mp4" type="video/mp4" />
</video>

<script src="mediaelement-and-player.min.js"></script>
<link rel="stylesheet" href="mediaelementplayer.css" />

<script>
	new MediaElementPlayer('player', {
		features: ['playpause', 'current', 'progress', 'duration', 'volume', 'tracks', 'fullscreen'],
		success: function (mediaElement, originalNode) {
			console.log('Player initialized');
		},
	});
</script>
```

---

### **20. Comparison: Which Library to Choose?**

| Criteria             | Plyr                      | Video.js             | MediaElement.js        |
| -------------------- | ------------------------- | -------------------- | ---------------------- |
| **Bundle Size**      | ~25KB                     | ~300KB               | ~100KB                 |
| **Customization**    | Good                      | Excellent            | Good                   |
| **Plugin Ecosystem** | Limited                   | Extensive            | Moderate               |
| **HLS/DASH**         | Via extension             | Built-in             | Via extension          |
| **Accessibility**    | Excellent                 | Good                 | Good                   |
| **Learning Curve**   | Low                       | Medium               | Low                    |
| **Best For**         | Simple, beautiful players | Complex requirements | Legacy browser support |

---

## 🎬 Part VIII: Video for Video Editors

> _"Master Chen encoded a 500MB video to 5MB. His student asked: 'Did you lose quality?' Chen replied: 'I lost only what the eye could not perceive and the network could not deliver.'"_ — [The Tao of the Moving Image: On Video Optimization]({{ '/lessons/en/media/video/the-tao-of-moving-images/#on-video-optimization' | absolute_url }})

### **21. Web-Optimized Export Settings**

As a video editor, understanding web delivery helps you export optimal files.

#### Export Checklist

- [ ] **Resolution**: Match target display (1080p for most, 4K for hero content)
- [ ] **Frame rate**: 24-30fps for standard, 60fps for gaming/sports
- [ ] **Codec**: H.264 for compatibility, H.265/VP9 for quality at lower bitrate
- [ ] **Bitrate**: 5-8 Mbps for 1080p, 20-35 Mbps for 4K
- [ ] **Audio**: AAC 128-256 kbps stereo
- [ ] **Format**: `.mp4` with `moov` atom at start (faststart)

#### DaVinci Resolve Export Settings

```
Format: MP4
Codec: H.264
Resolution: Match source or target
Quality: Restrict to 8000 kb/s (1080p) or 20000 kb/s (4K)
Key Frames: Automatic
Audio Codec: AAC
Audio Bitrate: 256 kb/s
Render at source resolution: ✓
Optimize for: Upload (moves moov atom)
```

#### Adobe Premiere/After Effects Export

```
Format: H.264
Preset: YouTube 1080p HD (good starting point)
Video Tab:
  - Bitrate Encoding: VBR, 2 pass
  - Target Bitrate: 8 Mbps
  - Maximum Bitrate: 12 Mbps
Audio Tab:
  - Bitrate: 256 kbps
Checkbox: "Render at Maximum Depth" for quality
```

---

### **22. Creating Video for Different Platforms**

| Platform        | Optimal Format | Aspect Ratio    | Max Duration | Notes                       |
| --------------- | -------------- | --------------- | ------------ | --------------------------- |
| Hero Background | MP4 (H.264)    | 16:9, 21:9      | 10-30s       | Loop seamlessly, no audio   |
| Instagram Feed  | MP4            | 1:1, 4:5        | 60s          | Start with hook             |
| Instagram Reels | MP4            | 9:16            | 90s          | Vertical, fast-paced        |
| TikTok          | MP4            | 9:16            | 3min         | Captions essential          |
| YouTube         | MP4/WebM       | 16:9            | Unlimited    | Quality > compression       |
| Twitter/X       | MP4            | 16:9, 1:1       | 2:20         | Captions, square works well |
| LinkedIn        | MP4            | 16:9, 1:1, 9:16 | 10min        | Professional tone           |

---

## 🎓 Practice Exercises

### Exercise 1: Basic Video Implementation (Beginner)

Create an accessible video player for a tutorial video:

1. Use the native `<video>` element
2. Provide multiple source formats (MP4 + WebM)
3. Add captions using WebVTT
4. Include a descriptive poster image
5. Test keyboard navigation

**Deliverable**: HTML file with working video and captions.

---

### Exercise 2: Responsive Video Gallery (Intermediate)

Build a video gallery page:

1. Display 6+ video thumbnails in a responsive grid
2. Lazy load videos using Intersection Observer
3. Use facade pattern for YouTube embeds
4. Implement lightbox/modal for playback
5. Ensure accessibility (focus management, keyboard controls)

**Deliverable**: Gallery page with performance audit showing lazy loading working.

---

### Exercise 3: Custom Video Player (Advanced)

Create a fully custom video player:

1. Build custom controls matching your design system
2. Implement all essential features (play, pause, seek, volume, fullscreen, captions)
3. Add keyboard shortcuts
4. Support `prefers-reduced-motion`
5. Add quality selection for multiple resolutions
6. Include playback speed controls

**Deliverable**: Custom player component ready for portfolio integration.

---

### Exercise 4: Video Background Hero (Advanced)

Create an immersive hero section:

1. Full-viewport video background
2. Art direction for mobile (different crop or fallback to image)
3. Pause button that persists state
4. `prefers-reduced-motion` support
5. Optimized for Core Web Vitals

**Deliverable**: Hero section passing Lighthouse audit.

---

## 📚 References and Further Reading

### Standards and Specifications

- W3C. (2024). "HTML Living Standard: The video element." <https://html.spec.whatwg.org/multipage/media.html#the-video-element>
- W3C. (2023). "WebVTT: The Web Video Text Tracks Format." <https://www.w3.org/TR/webvtt1/>
- W3C. (2023). "Media Source Extensions." <https://www.w3.org/TR/media-source/>

### Accessibility Guidelines

- W3C WAI. (2023). "Making Audio and Video Media Accessible." <https://www.w3.org/WAI/media/av/>
- WebAIM. (2024). "Captions, Transcripts, and Audio Descriptions." <https://webaim.org/techniques/captions/>
- Deque. (2023). "Video Accessibility Best Practices." <https://www.deque.com/blog/video-accessibility/>

### Performance Optimization

- Google Web.dev. (2024). "Video Optimization." <https://web.dev/articles/video-optimization>
- Cloudinary. (2024). "Video Optimization Guide." <https://cloudinary.com/guides/video-optimization>
- HTTP Archive. (2024). "Web Almanac: Media Chapter." <https://almanac.httparchive.org/en/2024/media>

### Tools and Libraries

- Plyr. (2024). <https://plyr.io/>
- Video.js. (2024). <https://videojs.com/>
- hls.js. (2024). <https://github.com/video-dev/hls.js>
- FFmpeg. (2024). <https://ffmpeg.org/documentation.html>

### Inspiration and Showcase

- Awwwards. "Video Implementation Examples." <https://www.awwwards.com/>
- CodePen. "Video Experiments." <https://codepen.io/search/pens?q=video>

---

## 🎯 Summary & Key Takeaways

### Essential Concepts

1. **HTML5 `<video>`** is the semantic foundation—always start here
2. **Multiple formats** (MP4 + WebM) ensure compatibility across browsers
3. **Captions are not optional**—they're essential for accessibility and SEO
4. **Performance matters**—lazy load, compress, and consider adaptive streaming
5. **Respect user preferences**—support `prefers-reduced-motion` and provide pause controls

### Pro Tips

- **Start with native**: The `<video>` element is surprisingly powerful
- **Measure twice, encode once**: Test different encoding settings
- **Progressive enhancement**: Basic functionality first, enhancements for capable browsers
- **Don't autoplay with sound**: Browsers will block it anyway
- **Test on real devices**: Mobile video behavior differs significantly from desktop

### The Video Hierarchy of Needs

```
🏔️ DELIGHT
   Interactive experiences, custom players
   ↑
🎨 STYLE
   Custom controls, brand consistency
   ↑
⚡ PERFORMANCE
   Lazy loading, adaptive streaming, compression
   ↑
♿ ACCESSIBILITY
   Captions, keyboard controls, reduced motion
   ↑
🏗️ FOUNDATION
   Semantic HTML5, multiple formats, fallbacks
```

---

## 💬 Reflection Questions

Before moving on, consider:

1. When would you choose self-hosted video over YouTube/Vimeo?
2. How do captions benefit users beyond those who are deaf or hard of hearing?
3. What performance metrics matter most for video-heavy pages?
4. How might AI-generated captions change accessibility workflows?
5. When does video add value vs. when is it gratuitous?

---

## 🎪 Exhibition: Showcase Your Video Work

Once you've implemented video in your project:

1. **Deploy** your video-enhanced site to GitHub Pages
2. **Document** your video strategy (formats, accessibility, performance)
3. **Present** (3 minutes) one video implementation explaining your technical and design decisions
4. **Critique** a peer's work: Is the video accessible? Does it enhance or distract?

Remember: **Video should serve the user's goals, not demonstrate technical prowess.**

---

**Previous Lesson**: [The Tao of Web Images]({{ '/lessons/en/media/images/the-tao-of-web-images/' | absolute_url }})

**Related**: [The Tao of the Moving Image]({{ '/lessons/en/media/video/the-tao-of-moving-images/' | absolute_url }})

**License**: Content CC BY-NC-SA 4.0 · Code MIT
**Author**: Rubén Vega Balbás, PhD · [UDIT](https://www.udit.es)
