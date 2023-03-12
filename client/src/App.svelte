<script lang="ts">
	import Header from "./partials/Header.svelte"
	import "highlight.js/styles/atom-one-dark-reasonable.css"
	import highlight from "highlight.js"
	import Footer from "./partials/Footer.svelte"
	let option: "JSON" | "HTML" = "JSON"
	let resultFetch: string = ""
	let playgroundResult: string = "Results..."
	let progress: boolean = false
	let finishFetch = false
	let isSubmit = false
	let errors: {
		status: boolean
		message: string
	} = {
		status: false,
		message: "",
	}

	let code

	const playgroundOption = (e: Event) => {
		resultFetch = ""
		finishFetch = false
		playgroundResult = "Results..."
		const el = e.target as HTMLSelectElement
		option = el.value as "JSON" | "HTML"
	}

	const changeData = (e) => {
		code = e.target.value
	}

	const handdleSubtmit = async () => {
		const url = `https://markuptojson.deno.dev/api/${option.toLocaleLowerCase()}`
		finishFetch = false
		isSubmit = true
		progress = false
		errors = {
			message: "",
			status: false,
		}

		const errorHanddle = () => {
			resultFetch = ""

			errors = {
				message: "Is not valid data",
				status: true,
			}
			progress = false
			playgroundResult = "Results..."
			finishFetch = false
			isSubmit = false
			return
		}

		if (code === "" || !code) {
			errors = {
				message: "The text field is empty",
				status: true,
			}
			isSubmit = false
			return
		}

		let body

		try {
			if (option === "JSON") {
				body = {
					htmlContent: code,
				}
			} else {
				body = {
					jsonContent: JSON.parse(code),
				}
			}
		} catch (error) {
			errorHanddle()
			return
		}
		progress = true
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})

		if (response.status === 200) {
			const { data } = (await response.json()) as {
				data: string
			}

			if (data.length === 0) {
				errorHanddle()
				return
			}

			resultFetch = option === "HTML" ? data : JSON.stringify(data)
			finishFetch = true
			isSubmit = false
			progress = false
			playgroundResult = ""

			return
		}

		errorHanddle()
	}

	const copyCode = () => {
		navigator.clipboard.writeText(resultFetch)
	}

	const downloadCode = () => {
		const blob = new Blob([resultFetch], { type: "text/plain" })
		const link = document.createElement("a")
		link.href = window.URL.createObjectURL(blob)
		link.download = option === "HTML" ? "code.html" : "code.json"
		link.click()
	}

	const fetchCreator = (async () => {
		const response = await fetch(
			"https://api.github.com/users/alexandermontillarivera",
		)
		const data = await response.json()
		return data
	})()
</script>

<Header />

<section id="home">
	<svg
		width="150px"
		height="150px"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 384 512"
		><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
			d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"
		/></svg
	>
	<h1>Markup to JSON</h1>
	<p>
		Transform your HTML to JSON format and share for REST API or other method
		easy. It works in the browser and on the server 🧭
	</p>
</section>

<section id="playground">
	<h2>Select what you want to convert what you insert in the text field</h2>
	<select on:change={playgroundOption}>
		<option selected value="JSON">JSON</option>
		<option value="HTML">HTML</option>
	</select>
	<div class="grid results">
		<textarea
			on:change={changeData}
			placeholder="Insert your code"
			name=""
			id=""
			cols="30"
			rows="10"
		/>
		<div
			class="language-html"
			class:copy-result={resultFetch !== ""}
			data-placeholder={playgroundResult}
			id="output"
		>
			{@html highlight.highlight(resultFetch, {
				language: option.toLocaleUpperCase(),
			}).value}
		</div>
	</div>
	<div class="finish-area grid">
		<button type="submit" on:click={handdleSubtmit} disabled={isSubmit}
			>Send</button
		>
		{#if finishFetch}
			<button on:click={copyCode} class="copy-btn">Copy</button>
			<button on:click={downloadCode} class="download-btn">Download</button>
		{/if}
	</div>
	{#if progress}
		<p class="loading" aria-busy="true">Generating code...</p>
	{/if}
	{#if errors.status}
		<p class="error-display">{errors.message}</p>
	{/if}
</section>

<section id="docs">
	<h2>Documentation</h2>
	<div class="docs-card grid">
		<div>
			<a href="https://github.com/alexandermontillarivera/markuptojson">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
					><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
					/></svg
				>
				<h3>Github</h3>
			</a>
		</div>
		<div>
			<a href="https://www.npmjs.com/package/markuptojson">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
					><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"
					/></svg
				>
				<h3>NPM</h3>
			</a>
		</div>
		<div>
			<a href="https://markuptojson.deno.dev/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
					><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
					/></svg
				>
				<h3>API</h3>
			</a>
		</div>
	</div>
</section>

<section id="creator">
	{#await fetchCreator}
		<article aria-busy="true" />
	{:then user}
		<h2>Creator</h2>
		<div class="grid">
			<div>
				<img
					src="https://avatars.githubusercontent.com/alexandermontillarivera"
					alt="Alexander Montilla Rivera"
				/>
			</div>
			<div>
				<h3>{user.name}</h3>
				<p>{user.bio}</p>
				<span class="location"
					><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
						><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
						/></svg
					>
					<p>{user.location}</p>
				</span>
				<div class="grid links">
					<div>
						<a href={user.blog}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
								><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M562.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L405.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C189.5 251.2 196 330 246 380c56.5 56.5 148 56.5 204.5 0L562.8 267.7zM43.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C57 372 57 321 88.5 289.5L200.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C416.5 260.8 410 182 360 132c-56.5-56.5-148-56.5-204.5 0L43.2 244.3z"
								/></svg
							>
							<p>Website</p>
						</a>
					</div>
					<div>
						<a href={"https://twitter.com/" + user.twitter_username}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
								><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
								/></svg
							>
							<p>Twitter</p>
						</a>
					</div>
					<div>
						<a href="https://github.com/alexandermontillarivera">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
								><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
								/></svg
							>
							<p>Github</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	{/await}
</section>

<Footer />

<style>
	h1 {
		margin-bottom: 0.5em;
	}

	button {
		transition: all 0.3s;
	}

	button:hover {
		opacity: 0.8;
		transition: all 0.3s;
		transform: scale(1.05);
	}

	textarea {
		height: 100%;
	}

	@media (max-width: 550px) {
		section {
			padding: 0em 1em;
		}
	}

	#home {
		width: 100%;
		display: flex;
		height: 90vh;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
	}

	#home p {
		max-width: 500px;
	}

	#playground {
		padding: 4em;
	}

	#playground .results div {
		width: 100%;
		height: 100%;
		border: 1px solid var(--form-element-border-color);
		border-radius: 0.3em;
		overflow: auto;
		position: relative;
		padding: 1em;
		background-color: transparent;
		min-height: 458px;
	}

	#playground .finish-area {
		margin-top: 1em;
	}

	#playground .results div::before {
		content: attr(data-placeholder);
		opacity: 0.6;
		position: absolute;
		color: var(--form-element-color) !important;
		top: 0.7em;
		left: 1em;
	}

	.copy-btn {
		background-color: #fdfd96;
		color: #1c0d02;
	}

	.download-btn {
		background-color: #77dd77;
	}

	.error-display {
		color: #c23b22;
		text-align: center;
	}

	.loading {
		text-align: center;
	}

	#docs {
		margin: 0px auto;
		padding: 4em;
	}
	#docs .docs-card div {
		max-width: 800px;
		height: 400px;
		width: 100%;
		border: 1px solid var(--form-element-border-color);
		transition: all 0.3s;
		border-radius: 0.3em;
		margin-bottom: 1em;
	}

	#docs .docs-card div:hover {
		transform: scale(1.05);
		transition: all 0.3s;
	}

	#docs .docs-card div a {
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
		display: flex;
		text-decoration: none;
		text-align: center;
		justify-content: center;
	}

	#docs .docs-card div h3 {
		margin-top: 1em;
	}

	#docs .docs-card div svg {
		max-width: 200px;
		height: 200px;
		width: 100%;
    padding: 1em;
	}

	#creator {
		padding: 4em;
	}

	#creator img {
		border-radius: 50%;
		max-width: 400px;
		height: 400px;
		border: 0.5em solid var(--form-element-border-color);
		width: 100%;
		object-fit: cover;
	}

	.location {
		display: flex;
		gap: 1em;
		align-items: center;
	}

	.location p {
		margin: 0px;
	}

	#creator svg {
		width: 30px;
		height: 30px;
	}

	.links {
		margin-top: 2em;
		justify-content: center;
	}

	.links div {
		display: flex;
	}

	.links a {
		display: flex;
		width: 150px;
		padding: 1em;
		color: #bbc6c9;
		border-radius: 0.3em;
		transition: all 0.3s;
		gap: 0.5em;
		justify-content: center;
		text-decoration: none;
		align-items: center;
		background: var(--form-element-border-color);
	}

	.links a:hover {
		transform: scale(1.1);
		transition: all 0.3s;
	}

	.links a p {
		margin: 0px;
		color: #bbc6c9;
	}

	@media (prefers-color-scheme: light) {
		.links a p {
			color: #fff;
		}
		.links a {
			color: #fff;
		}
	}

	@media (max-width: 991px) {
		.results,
		#docs .docs-card,
		#creator .grid {
			justify-content: center;
			align-items: center;
			text-align: center;
			gap: 2em;
		}
    .links div{
      display: flex;
      justify-content: center;
    }
		.location {
			justify-content: center;
		}
	}
</style>
