<template>
    <div>
        <label v-if="label">{{label}}</label>
        <b-input-group class="input-group-merge" >
            <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input :placeholder="placeholder" v-model="searchInput"/>
        </b-input-group>
    </div>
</template>

<script>
import {BInputGroup, BInputGroupPrepend, BFormInput ,BFormGroup} from 'bootstrap-vue'

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Search',
        }
    },
    data() {
        return {
            searchInput: '',
            timer: null,
        }
    },
    watch: {
        searchInput(newvalue) {
            if(this.timer) {
                clearTimeout(this.timer)
            }

            this.timer = setTimeout(() => {
                this.$emit('callback', newvalue)
            }, 500)
        }
    },
    destroyed() {
        if(this.timer) {
            clearTimeout(this.timer)
        }
    },
    components: { BInputGroup, BInputGroupPrepend, BFormInput, BFormGroup }
}
</script>

<style>

</style>