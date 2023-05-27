<template>
  <div class="index_view">
    <div class="index_view_header">
      <div
        class="index_view_header_logo"
        :class="[logoFixed ? 'logo_fixed' : '']"
        id="logo"
      >
        <img
          :src="logoFixed ? logoBluePng : logoPng"
          class="index_view_header_logo_img"
        />
      </div>
      <div class="index_view_header_info">
        <p class="index_view_header_info_name">更适用中小企业的</p>
        <h1 class="index_view_header_info_title">一体化定制系统</h1>
      </div>
      <p class="index_view_header_desc">
        每天有数千家企业——从跨国公司到初创企业，使用颐信巧思管理业务、安排订单和生产、处理进销存和财务流程。
      </p>
    </div>
    <div class="index_view_main">
      <div
        class="index_view_main_tabs"
        :class="[tabsFixed ? 'tabs_fixed' : '']"
        id="tabs"
      >
        <div
          class="index_view_main_tabs_item"
          :class="[item.id == current ? 'active' : '']"
          v-for="item in tabs"
          :key="item.id"
          @click="goToView(item.id)"
        >
          {{item.name}}
        </div>
      </div>
      <div
        class="index_view_main_section"
        :class="[item.id == current ? 'active' : '']"
        v-for="item in list"
        :key="item.id"
        @click="goToView(item.id)"
        :id="item.id"
      >
        <div class="index_view_main_section_header">
          <h3 class="index_view_main_section_header_title">
            {{item.name}}
            <span class="index_view_main_section_header_title_desc" v-if="item.desc">{{item.desc}}</span>
          </h3>
          <p class="index_view_main_section_header_introduce">{{item.introduce}}</p>
        </div>
        <div class="index_view_main_section_info">
          <img
            :src="item.img"
            class="index_view_main_section_info_img"
          />
          <div class="index_view_main_section_info_tabs">
            <div
              class="index_view_main_section_info_tabs_item"
              v-for="(json, index) in item.tags"
              :key="index"
              v-html="json"
            ></div>
          </div>
          <div class="index_view_main_section_info_tips" v-if="item.id == targetId && item.tip">{{item.tip}}</div>
        </div>
      </div>
    </div>
    <div class="index_view_footer">
      <canvas id="canvas-complex" style="width: 100%; height:100%"></canvas>
      <div class="index_view_footer_main">
        <h4 class="index_view_footer_title">在线沟通</h4>
        <p class="index_view_footer_desc">{{state.count}} 内免费获取定制信息化解决方案</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import Granim from 'granim';
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import logoPng from '@/assets/images/logo.png';
import logoBluePng from '@/assets/images/logo_blue.png';
const route = useRoute();
const router = useRouter();
const logoFixed = ref(false);
const tabsFixed = ref(false);
const logoHeight = ref('');
const tabsHeight = ref('');
let logoTop = ref(0);
let tabsTop = ref(0);
const tabs = ref([
  {
    id: 'custom',
    name: '深度定制'
  },
  {
    id: 'integration',
    name: '一体化'
  },
  {
    id: 'fast_cheap',
    name: '多快好省'
  },
  {
    id: 'industry',
    name: '行业选择'
  },
  {
    id: 'peers',
    name: '同行对比'
  },
  {
    id: 'trend',
    name: '未来趋势'
  }
]);
const list = ref([
  {
    id: 'custom',
    name: '深度定制',
    desc: '无需改变习惯',
    introduce: '根据企业的行业特点、制度、流程、习惯等量身打造，落地效果好。',
    img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
    tags: [],
    tip: '了解更多定制内容'
  },
  {
    id: 'integration',
    name: '一体化',
    desc: 'All In One',
    introduce: '我们包含全部功能模块，能够互联互通，并进行全局分析。覆盖ERP+CRM+进销存+生产+财务＋供应链+OA。',
    img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
    tags: [],
    tip: '了解所有功能模块'
  },
  {
    id: 'fast_cheap',
    name: '多快好省',
    desc: '',
    introduce: '系统更适合、落地效果更好、交付速度更快、成本更低。更适合中小企业的信息化解决方案。',
    img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
    tags: [
      '量身打造<br/>更适合',
      '成本低至<br/>传统定制20%',
      '从定制到上线<br/>快至1个月'
    ],
    tip: '了解成本控制方案'
  },
  {
    id: 'industry',
    name: '行业选择',
    desc: '',
    introduce: '各行各业数以千计企业的选择。',
    img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
    tags: [],
    tip: '了解行业定制方案'
  },
  {
    id: 'peers',
    name: '同行对比',
    desc: '',
    introduce: '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本。',
    img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
    tags: []
  },
  {
    id: 'trend',
    name: '未来趋势',
    desc: 'AIGC',
    introduce: '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本。',
    img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
    tags: []
  }
]);
const current = ref('');
const targetId = ref('');
const scrollTop = ref('');
const state = reactive({
  topList: [],
  sectionHeight: 0,
  seconds: 7200, 
  count: '',
  siv: null
})

onMounted(()=>{
  window.addEventListener('scroll', handleScroll, true);
  logoTop.value = document.getElementById('logo').offsetTop
  logoHeight.value = document.getElementById('logo').clientHeight
  tabsTop.value = document.getElementById('tabs').offsetTop
  tabsHeight.value = document.getElementById('tabs').clientHeight
  let list = document.getElementsByClassName('index_view_main_section');
  for (let i = 0;i <list.length; i++) {
    state.topList.push({
      name: list[i].getAttribute('id'),
      value: list[i].offsetTop
    });
  }
  state.sectionHeight = list[0].clientHeight;
  Time();
  init()
})

const goToView = (value) => {
  current.value = value;
  targetId.value = value;
  let anchor = document.getElementById(value);
  document.body.scrollTop = anchor.offsetTop;
  document.documentElement.scrollTop = anchor.offsetTop;
  window.scrollTo(0, anchor.offsetTop);
}

const handleScroll =()=> {
  scrollTop.value = document.documentElement.scrollTop;
  let windowHeight = window.innerHeight;
  let ceilHeight = windowHeight - state.sectionHeight;
  if (scrollTop.value >= logoTop.value) {
    logoFixed.value = true;
  } else {
    logoFixed.value = false;
  }
  if (scrollTop.value >= tabsTop.value) {
    tabsFixed.value = true;
  } else {
    tabsFixed.value = false;
  }
  let top = scrollTop.value + windowHeight - ceilHeight - tabsHeight.value - logoHeight.value;
  let result = state.topList.filter(item=>{
    return item.value >= top;
  })[0]
  if (result && result.name) {
    current.value = result.name;
  }
}

const countDown = () => {
    if (state.seconds == 0) {
      clearInterval(state.siv)
      state.siv = null
      window.location.reload();
    }
    let h = parseInt((state.seconds / (60 * 60)) % 24);
    h = h < 10 ? "0" + h : h;
    let m = parseInt((state.seconds / 60) % 60);
    m = m < 10 ? "0" + m : m;
    let s = parseInt(state.seconds % 60);
    s = s < 10 ? "0" + s : s;
    state.count = h + ":" + m + ":" + s;
}
const Time = () => {
  countDown(); //解决刷新页面时，间隔一秒才会显示的问题
  state.siv = setInterval(()=>{
    state.seconds-=1;
    countDown()
  },1000)
}

const init = () => {
  let granimInstance = new Granim({
    element: '#canvas-complex',
    direction: 'custom',
    customDirection: {
      x0: '40%',
      y0: '10px',
      x1: '60%',
      y1: '50%',
    },
    isPausedWhenNotInView: true,
    states : {
      "default-state": {
        gradients: [
          [
            { color: '#0D4BDD', pos: .2 },
            { color: '#75E9E5', pos: .8 },
            { color: '#0D4BDD', pos: 1 }
          ], [
            { color: '#0D4BDD', pos: 0 },
            { color: '#75E9E5', pos: .2 },
            { color: '#0D4BDD', pos: .75 }
          ],
        ]
      }
    }
  });
}

</script>
<style lang="less" scoped>
@import './index.less';
</style>
