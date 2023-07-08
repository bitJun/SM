<template>
  <div class="index_view">
    <div class="index_view_fixed" :style="{opacity: opacity}">
      <div
        class="index_view_header_logo"
      >
        <img
          :src="opacity == 1 ? logoBluePng : logoPng"
          class="index_view_header_logo_img"
        />
      </div>
      <div class="index_view_main_tab">
        <div
          class="index_view_main_tabs"
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
    </div>
    <div class="index_view_header">
      <div
        class="index_view_header_logo"
        id="logo"
      >
        <img
          :src="opacity == 1 ? logoBluePng : logoPng"
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
      <div class="index_view_main_tab">
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
          <div class="index_view_main_section_info" :class="[item.id]" v-if="item.id != 'custom'">
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
          <div v-else class="index_view_main_section_content">
            <img
              :src="sectionBg"
              class="index_view_main_section_content_bg"
            />
            <Swiper
              :autoplay="swiper1Playing"
              :loop="true"
              :speed="1000"
              class="index_view_main_section_content_first"
            >
              <SwiperSlide>
                <img
                  :src="img1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  :src="img2"
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              :autoplay="swiper2Playing"
              :loop="true"
              :speed="1000"
              class="index_view_main_section_content_second"
            >
              <SwiperSlide>
                <img
                  :src="img3"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  :src="img4"
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              :autoplay="swiper3Playing"
              :loop="true"
              :speed="1000"
              class="index_view_main_section_content_third"
            >
              <SwiperSlide>
                <img
                  :src="img5"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  :src="img6"
                />
              </SwiperSlide>
            </Swiper>
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
          <!-- <span class="index_view_main_company_section_left">“</span> -->
          <p class="index_view_main_company_section_info">每天有各行各业数千家企业</p>
          <p class="index_view_main_company_section_info">从跨国公司到初创企业</p>
          <p class="index_view_main_company_section_info">使用颐信巧思管理企业</p>
          <!-- <span class="index_view_main_company_section_right">”</span> -->
        </div>
        <div class="index_view_main_company_section2">
          <div class="index_view_main_company_section2_list">
            <div class="index_view_main_company_section2_list_item">
              <img
                :src="company1"
                class="index_view_main_company_section2_list_item_img"
              />
            </div>
            <div class="index_view_main_company_section2_list_item">
              <img
                :src="company2"
                class="index_view_main_company_section2_list_item_img"
              />
            </div>
            <div class="index_view_main_company_section2_list_item">
              <img
                :src="company3"
                class="index_view_main_company_section2_list_item_img"
              />
            </div>
            <div class="index_view_main_company_section2_list_item">
              <img
                :src="company4"
                class="index_view_main_company_section2_list_item_img"
              />
            </div>
          </div>
          <div class="index_view_main_company_section2_logo">
            <img
              :src="logoSmall"
              class="index_view_main_company_section2_logo_img"
            />
          </div>
        </div>
        <!-- <img :src="bg3" class="index_view_main_company_bg" /> -->
      </div>
    </div>
    <div class="index_view_footer">
      <img
        :src="mask"
        class="index_view_footer_mask"
      />
      <div class="index_view_footer_main">
        <h4 class="index_view_footer_title">在线沟通</h4>
        <p class="index_view_footer_desc">{{state.count}} 内免费获取定制信息化解决方案</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import SwiperCore, { Autoplay } from 'swiper';
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, reactive, onMounted, defineComponent, watch, nextTick } from 'vue';
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
import img1 from '@/assets/images/img1.png';
import img2 from '@/assets/images/img2.png';
import img3 from '@/assets/images/img3.png';
import img4 from '@/assets/images/img4.png';
import img5 from '@/assets/images/img5.png';
import img6 from '@/assets/images/img6.png';
import img7 from '@/assets/images/img7.png';
import mask from '@/assets/images/mask.png';
import sectionBg from '@/assets/images/sectionBg.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
defineComponent({
  Swiper,
  SwiperSlide
})
SwiperCore.use(Autoplay);
const Route = useRoute();
const logoHeight = ref('');
const tabsHeight = ref('');
let logoTop = ref(0);
let tabsTop = ref(0);
let opacity = ref(0);

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
        name: '从定制到上线<br/>快至1个月',
      },
      {
        img: icon3,
        name: '量身打造<br/>更适合'
      }
    ],
    tip: '了解成本控制方案'
  }
]);
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
const swiper1Playing = ref({
  delay: 1000,
  disableOnInteraction: false,
});
const swiper2Playing = ref({
  delay: 1000,
  disableOnInteraction: true,
});
const swiper3Playing = ref({
  delay: 1000,
  disableOnInteraction: true,
});
const step = ref(1);
const pauseSwiper1 = () => {
  swiper1Playing.value = {
    delay: 1000,
    disableOnInteraction: false,
  };
  swiper2Playing.value = {
    delay: 1000,
    disableOnInteraction: true,
  };
  swiper3Playing.value = {
    delay: 1000,
    disableOnInteraction: true,
  };
};

const pauseSwiper2 = () => {
  swiper1Playing.value = {
    delay: 1000,
    disableOnInteraction: true,
  };
  swiper2Playing.value = {
    delay: 1000,
    disableOnInteraction: false,
  };
  swiper3Playing.value = {
    delay: 1000,
    disableOnInteraction: true,
  };
};

const pauseSwiper3 = () => {
  swiper1Playing.value = {
    delay: 1000,
    disableOnInteraction: true,
  };
  swiper2Playing.value = {
    delay: 1000,
    disableOnInteraction: true,
  };
  swiper3Playing.value = {
    delay: 1000,
    disableOnInteraction: false,
  };
};

onMounted(()=>{
  // swiper1Playing.value = true;
  setInterval(() => {
   
    step.value = step.value + 1;
    if (step.value == 4) {
      step.value = 1
    }
  }, 2000);
  let timeId;
  window.addEventListener('scroll', () => {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      handleScroll();
    }, 50);
    onScroll();
  } , true);

  logoTop.value = document.getElementById('logo').getBoundingClientRect().top
  logoHeight.value = document.getElementById('logo').clientHeight
  tabsTop.value = document.getElementById('tabs').getBoundingClientRect().top
  tabsHeight.value = document.getElementById('tabs').clientHeight
  Time();
});

nextTick(()=>{
  let list = document.getElementsByClassName('index_view_main_section');
  for (let i = 0;i <tabs.value.length; i++) {
    let value = document.getElementById(tabs.value[i].id).offsetTop
    console.log('value', value)
    if (i > 0) {
      value =  document.getElementById(tabs.value[i-1].id).offsetTop + value
    }
    state.topList.push({
      name: tabs.value[i].id,
      value: value,
    });
  }
  state.sectionHeight = list[0].clientHeight;
  console.log('state.topList', state.topList)
})

const onClickTabView = (value) => {
  state.current = value;
  let anchor = document.getElementById(value);
  document.body.scrollTop = anchor.offsetTop;
  document.documentElement.scrollTop = anchor.offsetTop;
  console.log('anchor.offsetTop', anchor.offsetTop)
  window.scrollTo({
    top: anchor.offsetTop - tabsHeight.value,
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
    top: anchor.offsetTop - tabsHeight.value,
	  behavior: 'smooth'
  })
}

const onScroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop > tabsTop.value) {
    opacity.value = 1;
  } else {
    opacity.value = scrollTop / tabsTop.value;
  }
}

const handleScroll =()=> {
  scrollTop.value = document.documentElement.scrollTop;
  let top = scrollTop.value + tabsHeight.value;
  let result = {};
  console.log('scrollTop.value', scrollTop.value)
  state.topList.forEach((item, index) => {
    if (state.topList[index + 1]) {
      if (item.value < top && state.topList[index + 1].value  > top) {
        result = item
        return false;
      }
    } else {
      console.log(33)
      if (item.value < top) {
        result = item
        return false;
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
  countDown();
  state.siv = setInterval(()=>{
    state.seconds-=1;
    countDown()
  },1000)
}
watch(step, (newval, val) => {
  if (newval == 1) {
    pauseSwiper1();
  } else if (newval == 2) {
    pauseSwiper2();
  } else if (newval == 3) {
    pauseSwiper3();
  }
})
</script>
<style lang="less" scoped>
@import './index.less';
</style>