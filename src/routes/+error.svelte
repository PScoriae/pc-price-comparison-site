<script>
// @ts-nocheck

	import '$pcss';
  import { page } from '$app/stores';
</script>

<div class="text-4xl flex items-center justify-center h-screen">
  {$page.status}: {$page.error.message}
</div>

