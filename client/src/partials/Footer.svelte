<footer>
	<ul class="grid">
		<li>
			<a target="_blank" href="https://icons8.com/icon/dTatFtyjBREl/html"
				>HTML</a
			>
			icon by <a target="_blank" href="https://icons8.com">Icons8</a>
		</li>
		<li>
			<a target="_blank" href="https://svelte.dev/">Framework Web: Svelte 🧡</a>
		</li>
		<li>
			<a target="_blank" href="https://fontawesome.com/icons">Icons: Font Awesome</a>
		</li>
    <li>
			<a target="_blank" href="https://picocss.com/">UI Framework: Pico.CSS</a>
		</li>
	</ul>
</footer>

<style>
	footer {
		padding: 4em;
	}
	ul {
		list-style: none;
		justify-content: center;
	}

	li {
		display: flex;
		gap: 0.5em;
		justify-content: center;
	}
	li::marker {
		content: "";
		display: none;
	}

  @media (max-width: 991px){
    ul{
      gap: 1em;
    }
  }
</style>
