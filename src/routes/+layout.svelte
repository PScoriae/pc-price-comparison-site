<script lang="ts">
  import { Nav, NavLink} from 'sveltestrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
</script>


<div class="container p-3 d-flex flex-column min-vh-100">
  <Nav class="bg-light justify-content-center">
    <NavLink class="p-3" href="/">Home</NavLink>
    <NavLink class="p-3" href="/configurator">Configurator</NavLink>
    <NavLink class="p-3" href="/learning-centre">Learning Centre</NavLink>
  </Nav>
  
  <slot></slot>
  
  <div class="container mt-auto">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          img here
        </a>
        <span class="mb-3 mb-md-0 text-muted">© 2022 Pierre Corazo Cesario</span>
      </div>
  
      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-muted" href="https://github.com/PScoriae/pc-price-comparison-site">GitHub</a></li>
        <li class="ms-3"><a class="text-muted" href="https://www.linkedin.com/in/pierreccesario/">LinkedIn</a></li>
        <li class="ms-3"><a class="text-muted" href="https://pierreccesario.com/">Portfolio Website</a></li>
      </ul>
    </footer>
  </div>
</div>

