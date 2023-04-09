# Example

<script setup>
import { defineAsyncComponent } from 'vue'
const Example = defineAsyncComponent(() => import('./ExampleColorPicker.vue'))
</script>
<ClientOnly>
  <Suspense>
    <Example />
  </Suspense>
</ClientOnly>
