<template>
  <div>
    <BModal
      id="modal-addlocation"
      @shown="reloadMap()"
      no-close-on-backdrop
      centered
      size="lg"
      @ok="submit"
      :title="$t('shop_list.shop_location')"
      :ok-title="$t('shop_list.save')"
      :cancel-title="$t('shop_list.cancel')"
    >
      <div style="height: 60vh; width: 10wh">
        <l-map
          ref="map"
          :zoom="zoom"
          @click="setMarker"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <!-- @click="addMarker" -->
          <!-- <l-marker
            v-for="(marker, index) in markers"
            :key="index"
            :lat-lng="marker"
            @click="removeMarker(index)"
          ></l-marker> -->
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
      BFormInput,
      LMap,
      LTileLayer,
      LMarker,
    },
    name: 'MapComponent',
    props: {
      marker: {
        type: Object,
        default: () => ({
          lat: 0,
          lng: 0,
        }),
      },
    },
    data() {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

        zoom: 11,
        center: [41.29965, 69.24577],
        bounds: null,
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
      // removeMarker(index) {
      //   this.markers.splice(index, 1);
      // },
      // addMarker(event) {
      //   if (this.markers < 1) {
      //     this.markers.push(event.latlng);
      //   }
      // },
      setMarker(event) {
        this.marker = event.latlng
      },
      submit() {
        let { lat, lng } = this.marker
        let context = { lat, lng }
        this.$emit('submit', context)
      },
    },
  }
</script>

<style></style>
