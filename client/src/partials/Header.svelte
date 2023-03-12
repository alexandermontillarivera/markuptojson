<script>

</script>
<header>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#playground">Playground</a></li>
      <li><a href="#docs">Docs</a></li>
      <li><a href="#creator">Creator</a></li>
    </ul>
  </nav>
</header>


<style>
  header{
    height: 3.4em;
    width: 100%;
  }
  nav{
    width: 100%;
    position: relative;
  }
  ul{
    width: 101%;
    display: flex;
    position: fixed;
    left: 0em;
    padding: 0em 1em;
    justify-content: end;
    background-color: #415462;
    z-index: 3;
  }
  a{
    color: #B6BEC9;
  }

  
	@media (prefers-color-scheme: light) {
		a{
      color: #FFF;
    }
	}

  @media (max-width: 991px) {
    ul{
      width: 104%;
      justify-content: center;
    }
  }
</style>