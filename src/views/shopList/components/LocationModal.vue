<template>
  <div>
    <BModal
      sm
      col
      id="modal-location"
      @shown="reloadMap()"
      centered
      size="lg"
      :title="$t('shop_list.shop_location')"
      ok-only
      :ok-title="$t('shop_list.close')"
    >
      <div style="height: 60vh; width: 10wh">
        <l-map
          ref="map"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-marker :lat-lng="marker"></l-marker>
          <l-tile-layer :url="url"></l-tile-layer>
        </l-map>
      </div>
      <div>
        <BFormInput
          style="max-width: 290px;"
          class="mt-1"
          :value="
            this.$t('shop_list.koordinats') +
              ':  ' +
              marker.lat.toFixed(4) +
              '    |    ' +
              marker.lng.toFixed(4)
          "
          readonly
        />
      </div>
    </BModal>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
  import { BModal, BFormInput } from 'bootstrap-vue'
  import 'leaflet/dist/leaflet.css'

  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  })

  export default {
    components: {
      BModal,
      LMap,
      LTileLayer,
      LMarker,
      BFormInput,
    },
    name: 'MapComponent',
    props: {
      marker: {
        type: Object,
        default: () => ({
          lat: '',
          lng: '',
        }),
      },
    },
    data() {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

        zoom: 11,
        center: [41.29965, 69.24577],
        bounds: null,
        markers: [],
      }
    },

    methods: {
      zoomUpdated(zoom) {
        this.zoom = zoom
      },
      centerUpdated(center) {
        this.center = center
      },
      boundsUpdated(bounds) {
        this.bounds = bounds
      },
      reloadMap: function() {
        this.$refs.map.mapObject.invalidateSize()
      },
    },
  }
</script>

<style></style>
