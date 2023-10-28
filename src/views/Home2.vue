<template>
  <div>
    <b-row>
      <b-col class="col-md-4 col-12">
        <b-card>
          <b-row class="align-items-center">
            <b-col class="col-md-5 col-12 px-2 text-center">
              <div
                class="bg-secondary py-1 rounded"
                v-if="!getUsersHomeId.photo"
              >
                <svg
                  style="fill:white"
                  viewBox="0 0 16 16"
                  width="150"
                  height="140"
                  focusable="false"
                  role="img"
                  aria-label="person fill"
                  aria-hidden="true"
                  alt="avatar"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi-person-fill b-icon bi"
                >
                  <g>
                    <path
                      fill-rule="evenodd"
                      d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    />
                  </g>
                </svg>
              </div>

              <img
                class="rounded img__avatar"
                v-if="getUsersHomeId.photo"
                :src="getUsersHomeId.photo"
                alt=""
              />
            </b-col>

            <b-col class="col-md-7 col-12">
              <!--              <div class="d-flex align-items-center">-->
              <!--                <p class="font-weight-bold">Фамилия:</p>-->
              <!--                <p class="ml-1"></p>-->
              <!--              </div>-->

              <div class="d-flex align-items-center mb-50">
                <p class="font-weight-bold mb-0">
                  Имя:
                </p>
                <p class="ml-50 mb-0">
                  {{ getUsersHomeId.name }}
                </p>
              </div>

              <!--              <div class="d-flex align-items-center">-->
              <!--                <p class="font-weight-bold">Отчество:</p>-->
              <!--                <p class="ml-1"></p>-->
              <!--              </div>-->

              <div class="d-flex align-items-center mb-50">
                <p class="font-weight-bold mb-0">
                  Роли:
                </p>
                <b-badge
                  variant="success"
                  class="ml-50"
                  v-for="(item, index) in getUsersHomeId.role"
                  :key="index"
                >
                  {{ item.name }}
                </b-badge>
              </div>

              <div class="d-flex align-items-center mb-50">
                <p class="font-weight-bold mb-0">
                  Закреплен номера:
                </p>
                <p class="font-weight-bold mb-0 ml-50">
                  #45543
                </p>
              </div>

              <div class="d-flex align-items-center mb-50">
                <p class="font-weight-bold mb-0">
                  Телефон номер:
                </p>
                <p class="ml-50 mb-0">+{{ getUsersHomeId.phone }}</p>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col class="col-md-8 col-12">
        <b-row>
          <b-col
            class="col-md-6"
            v-for="(statistic, index) in getHeaderStatistics"
            :key="index"
          >
            <b-card>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex flex-column text-left">
                  <h4 class="text-capitalize">
                    {{ statistic.type }}
                  </h4>

                  <span>{{ statistic.total }}</span>
                </div>

                <div class="b-avatar rounded-circle" :class="statistic.badge">
                  <feather-icon
                    :icon="statistic.icon"
                    size="22"
                    :class="statistic.color"
                  />
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        class="col-md-6 col-12"
        v-if="getPeremission(['manager', 'administrator', 'buhgalter'])"
      >
        <b-card>
          <h4 class="mb-0">
            Суточный график входящих звонков по часам &nbsp; {{ date() }}
          </h4>
          <IEcharts
            :option="optionBar"
            ref="gauge"
            :resizable="true"
            class="echarts"
          />
        </b-card>
      </b-col>

      <b-col class="col-md-12 col-12" v-else>
        <b-card>
          <IEcharts
            :option="optionBar"
            ref="gauge"
            :resizable="true"
            class="echarts"
          />
        </b-card>
      </b-col>

      <b-col
        class="col-md-6"
        v-if="getPeremission(['manager', 'administrator'])"
      >
        <b-card>
          <h4 class="mb-0">
            Общее количество звонков по консультантам
          </h4>
          <IEcharts
            :option="optionPie"
            ref="gauge"
            :resizable="true"
            class="echarts"
          />
        </b-card>
      </b-col>

      <b-col class="col-md-12">
        <b-card>
          <h4 class="mb-2">
            Последние обращения
          </h4>
          <homeTable />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { BCard, BCol, BRow, BBadge } from 'bootstrap-vue'
  import IEcharts from 'vue-echarts-v3/src/full'
  import { VueGoodTable } from 'vue-good-table'
  import { mapActions, mapGetters } from 'vuex'
  import homeTable from '@/views/components/homeTable'
  import { getUserData } from '@/auth/utils'

  export default {
    components: {
      BCard,
      BCol,
      BRow,
      IEcharts,
      VueGoodTable,
      homeTable,
      BBadge,
    },
    data() {
      return {
        searchTerm: '',
        optionBar: {
          tooltip: {
            trigger: 'item',
          },
          xAxis: {
            type: 'category',
            data: [],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [],
              type: 'bar',
              color: ['#5B7AD8'],
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)',
              },
            },
          ],
        },

        optionPie: {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'right',
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '50%',
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        },
      }
    },
    computed: {
      ...mapGetters('report', ['getReportOperatorsByCalls']),
      ...mapGetters('home', [
        'getHomeData',
        'getHeaderStatistics',
        'getUsersHomeId',
      ]),
    },
    methods: {
      ...mapActions('report', ['FETCH_REPORT_OPERATORS_BY_CALLS']),
      ...mapActions('home', ['FETCH_HOME_DATA', 'FETCH_USERS_HOME']),
      getPeremission(roles) {
        for (let i = 0; i < roles.length; i++) {
          if (getUserData().role.includes(roles[i])) {
            return true
          }

          return false
        }
      },
      date() {
        const a = new Date().toLocaleString()
        return a.split(',')[0]
      },
    },
    async mounted() {
      await this.FETCH_USERS_HOME(getUserData().id)
      await this.FETCH_HOME_DATA()
      if (!this.getReportOperatorsByCalls.length) {
        await this.FETCH_REPORT_OPERATORS_BY_CALLS()
        const { data2, data3 } = this.getReportOperatorsByCalls

        // optionPie
        this.optionPie.legend.data = data2.name
        this.optionPie.series[0].data = data3
      }

      // optionBar
      this.optionBar.xAxis.data = this.getHomeData.data_1.name

      this.optionBar.series = [
        {
          data: this.getHomeData.data_1.value,
          type: 'bar',
          color: ['#5B7AD8'],
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ]
    },
  }
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-good-table.scss';

  .echarts {
    min-height: 600px;
  }

  .img__avatar {
    max-height: 200px;
    max-width: 190px;
    min-width: 190px;
    object-fit: cover;
    min-height: 168px;
  }
</style>
