// namespace: "index" 
<template>
  <div class="index-container">
    展示locales配置的内容：
     <br>

    <!-- 方式一、直接页面内使用 : 更改locale.value时 可直接自动切换对应语言 -->
    方式一： {{ $t("headTxt.user.name") }}
    <br />

    <!-- 方式二、使用变量方式 : 看起来简洁明，但是更改locale.value时, 不能够自动切换对应语言！！！！ -->
    方式二：{{ state.name }}
    <br />

    <!-- 方式三、使用变量方式+computed计算属性 简洁明了，更改locale.value时。也能够自动切换对应语言！！！！！！！！ -->
    方式二：{{ state.computedName }}
    <br />
    方式一： {{ $t("wow",{msg:'测试'}) }}
    <!-- 切换语言模式按钮  (方式一、直接页面内使用 好处：更改locale.value时 可直接自动切换对应语言)-->
    <button @click="changeLanguage">
      {{ $t("languageTxt") }}
    </button>

  </div>
</template>
<script>
// 国际化
import { useI18n } from "vue-i18n";
import {i18n} from "@/lang";
import { reactive, computed } from "vue";
import {data1} from './data'
export default {
  name: "index",
  setup() {
    const I18n = useI18n();
    let { locale } = I18n;
    // 可以拿到我们当前设置的默认语言，切换语言更改locale.value的值即可，
    // 但要和你language/index.js中message设置的key的值一致！！！
    // 如果有需要，可以在store中配置一个然后全局使用

    const state = reactive({
      name: i18n.global.t("headTxt.user.name"),
      computedName: computed(() => i18n.global.t("headTxt.user.name")),
    });

    /**
     * 切换语言
     */
    const changeLanguage = () => {
      locale.value = locale.value == "zhCN" ? "enUS" : "zhCN"; // 切换中英文
    };

    return { state, locale, changeLanguage };
  },
};
</script>
<style lang="scss" scoped>
.index-container {
}
</style>
