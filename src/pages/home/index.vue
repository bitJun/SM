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
        {{description[Route.query.type || 'A'].topdesc}}
      </p>
    </div>
    <div class="index_view_main">
      <div class="index_view_main_tab" :class="[tabsFixed ? 'tabs_fixed' : '']">
        <div
          class="index_view_main_tabs"
          id="tabs"
        >
          <div
            class="index_view_main_tabs_item"
            :class="[item.id == state.current ? 'active' : '']"
            v-for="item in tabs"
            :key="item.id"
            @click="onClickTabView(item.id)"
          >
            {{item.name}}
          </div>
        </div>
        <div class="index_view_main_tab_mask"></div>
      </div>
      <div class="index_view_main_list">
        <div
          class="index_view_main_section"
          :class="[item.id == state.current ? 'active' : '']"
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
              v-if="item.img"
              :src="item.img"
              class="index_view_main_section_info_img"
            />
            <div class="index_view_main_section_info_tabs" v-if="item.tags && item.tags.length > 0">
              <div
                class="index_view_main_section_info_tabs_item"
                v-for="(json, index) in item.tags"
                :key="index"
              >
                <img
                  class="index_view_main_section_info_tabs_item_img"
                  :src="json.img"
                />
                <div class="index_view_main_section_info_tabs_item_desc" v-html="json.name"></div>
              </div>
            </div>
            <div class="index_view_main_section_info_tips" v-if="item.id == state.targetId && item.tip">{{item.tip}}</div>
          </div>
        </div>
      </div>
      <div class="index_view_main_other">
        <div class="index_view_main_other_title">更适合中小企业的选择</div>
        <img
          :src="chooseImg"
          class="index_view_main_other_img"
        />
      </div>
      <div class="index_view_main_company">
        <div class="index_view_main_company_section">
          <span class="index_view_main_company_section_left">“</span>
          <p class="index_view_main_company_section_info">每天有各行各业数千家企业</p>
          <p class="index_view_main_company_section_info">从跨国公司到初创企业</p>
          <p class="index_view_main_company_section_info">使用颐信巧思管理企业</p>
          <span class="index_view_main_company_section_right">”</span>
        </div>
        <div class="index_view_main_company_section2">
          <div class="index_view_main_company_section2_list">
            <img
              :src="company1"
              class="index_view_main_company_section2_list_item"
            />
            <img
              :src="company2"
              class="index_view_main_company_section2_list_item"
            />
            <img
              :src="company3"
              class="index_view_main_company_section2_list_item"
            />
            <img
              :src="company4"
              class="index_view_main_company_section2_list_item"
            />
          </div>
          <div class="index_view_main_company_section2_logo">
            <img
              :src="logoSmall"
              class="index_view_main_company_section2_logo_img"
            />
          </div>
        </div>
        <img :src="bg3" class="index_view_main_company_bg" />
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
import { useRoute } from 'vue-router';
import logoPng from '@/assets/images/logo.png';
import logoBluePng from '@/assets/images/logo_blue.png';
import customImg from '@/assets/images/custom_img.png';
import integrationImg from '@/assets/images/integration.png';
import icon1 from '@/assets/images/icon1.png';
import icon2 from '@/assets/images/icon2.png';
import icon3 from '@/assets/images/icon3.png';
import chooseImg from '@/assets/images/choose.png';
import company1 from '@/assets/images/company1.png';
import company2 from '@/assets/images/company2.png';
import company3 from '@/assets/images/company3.png';
import company4 from '@/assets/images/company4.png';
import logoSmall from '@/assets/images/logo_small.png';
import bg3 from '@/assets/images/bg3.png';
const Route = useRoute();
const logoFixed = ref(false);
const tabsFixed = ref(false);
const logoHeight = ref('');
const tabsHeight = ref('');
let logoTop = ref(0);
let tabsTop = ref(0);
const description = reactive({
  'A': {
    topdesc: '我们提供包含 ERP + MES + CRM + OA + 供应链管理的全面定制化解决方案，为企业构建最适合自身的一体化管理系统。',
    custom: '根据企业的行业特点、制度、流程、习惯量身打造，落地效果好，无需改变习惯。',
    integration: '包含全部功能模块，覆盖ERP+CRM+进销存+生产+财务+供应链+OA。能够互联互通,并进行全局分析。',
    fast_cheap: '系统更适合、落地效果更好、交付速度更快、成本更低。适合中小企业的信息化解决方案。'
  },
  'B': {
    topdesc: `不止于${Route.query.keyword}，我们还提供包含 ERP + MES + CRM + OA + 供应链管理的全面定制化解决方案，为企业构建最适合自身的一体化管理系统。`,
    custom: '根据企业的行业特点、制度、流程、习惯量身打造，落地效果好，无需改变习惯。',
    integration: `既可以单独部署${Route.query.keyword}并与其他系统整合对接，也可以构建包含ERP+CRM+进销存+生产+财务+供应链+OA的整体解决方案`,
    fast_cheap: '系统更适合、落地效果更好、交付速度更快、成本更低。适合中 付速度更快、成本更低。适合中小企业的信息化解决方案。'
  },
  'C': {
    topdesc: `我们为${Route.query.keyword}企业提供包含 ERP + MES + CRM + OA + 供应链管理的全面定制化解决方案，为{keyword}企业构建最适合自身的一体化管理系统。`,
    custom: `根据${Route.query.keyword}企业的行业特点、制度、流程、习惯量身打造，落地效果好，无需改变习各`,
    integration: '包含全部功能模块，覆盖ERP+CRM+进销存+生产+财务+供应链+OA。能够互联互通,并进行全局分析。',
    fast_cheap: '系统更适合、落地效果更好、交付速度更快、成本更低。适合中 付速度更快、成本更低。适合中小企业的信息化解决方案。'
  }
})
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
  // {
  //   id: 'industry',
  //   name: '行业选择'
  // },
  // {
  //   id: 'peers',
  //   name: '同行对比'
  // },
  // {
  //   id: 'trend',
  //   name: '未来趋势'
  // }
]);
const list = ref([
  {
    id: 'custom',
    name: '深度定制',
    desc: '无需改变习惯',
    introduce: description[Route.query.type || 'A'].custom,
    img: customImg,
    tags: [],
    tip: '了解更多定制内容'
  },
  {
    id: 'integration',
    name: '一体化',
    desc: 'All In One',
    introduce: description[Route.query.type || 'A'].integration,
    img: integrationImg,
    tags: [],
    tip: '了解所有功能模块'
  },
  {
    id: 'fast_cheap',
    name: '多快好省',
    desc: '',
    introduce: description[Route.query.type || 'A'].fast_cheap,
    img: '',
    tags: [
      {
        img: icon1,
        name: '成本低至<br/>传统定制20%',
      },
      {
        img: icon2,
        name: '量身打造<br/>更适合',
      },
      {
        img: icon3,
        name: '从定制到上线<br/>快至1个月'
      }
    ],
    tip: '了解成本控制方案'
  },
  // {
  //   id: 'industry',
  //   name: '行业选择',
  //   desc: '',
  //   introduce: '各行各业数以千计企业的选择。',
  //   img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
  //   tags: [],
  //   tip: '了解行业定制方案'
  // },
  // {
  //   id: 'peers',
  //   name: '同行对比',
  //   desc: '',
  //   introduce: '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本。',
  //   img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
  //   tags: []
  // },
  // {
  //   id: 'trend',
  //   name: '未来趋势',
  //   desc: 'AIGC',
  //   introduce: '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本。',
  //   img: 'https://p8.qhimg.com/dmfd/165_90_75/t014d3a7bd566a2f45c.webp?size=604x502',
  //   tags: []
  // }
]);
const current = ref('');
const targetId = ref('');
const scrollTop = ref('');
const state = reactive({
  topList: [],
  sectionHeight: 0,
  seconds: 7200, 
  count: '',
  siv: null,
  current: '',
  targetId
})

onMounted(()=>{
  let timeId;
  window.addEventListener('scroll', () => {
    // 页面滚动停止100毫秒后才会执行下面的函数。
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      handleScroll();
      console.log('执行完了哦');
    }, 50);
  } , true);
  // window.addEventListener('scroll', handleScroll, true);
  logoTop.value = document.getElementById('logo').getBoundingClientRect().top
  logoHeight.value = document.getElementById('logo').clientHeight
  tabsTop.value = document.getElementById('tabs').getBoundingClientRect().top
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
const onClickTabView = (value) => {
  state.current = value;
  let anchor = document.getElementById(value);
  document.body.scrollTop = anchor.offsetTop;
  document.documentElement.scrollTop = anchor.offsetTop;
  window.scrollTo({
    top: anchor.offsetTop - tabsHeight.value - logoHeight.value,
	  behavior: 'smooth'
  })
}
const goToView = (value) => {
  state.current = value;
  state.targetId = value;
  let anchor = document.getElementById(value);
  document.body.scrollTop = anchor.offsetTop;
  document.documentElement.scrollTop = anchor.offsetTop;
  // window.scrollTo(0, anchor.offsetTop - tabsHeight.value - logoHeight.value);
  window.scrollTo({
    top: anchor.offsetTop - tabsHeight.value - logoHeight.value,
	  behavior: 'smooth'
  })
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
  let top = scrollTop.value + windowHeight - ceilHeight;
  let result = {};
  state.topList.forEach((item, index) => {
    if (state.topList[index + 1]) {
      if (item.value < top && state.topList[index + 1].value > top) {
        result = item
      }
    } else {
      if (item.value < top) {
        result = item
      }
    }
  })
  if (result && result.name) {
    state.current = result.name;
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
    // customDirection: {
    //   x0: '40%',
    //   y0: '10px',
    //   x1: '60%',
    //   y1: '50%',
    // },
    isPausedWhenNotInView: true,
    direction: 'left-right',
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
        ],
        transitionSpeed: 1200
      }
    }
  });
}

</script>
<style lang="less" scoped>
@import './index.less';
</style>
