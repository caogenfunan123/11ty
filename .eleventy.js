module.exports = function (eleventyConfig) {
  // 添加 date 过滤器（Nunjucks 兼容）
  eleventyConfig.addFilter("date", function (dateObj, format) {
    let date;
    if (dateObj === "now" || !dateObj) {
      date = new Date();
    } else if (dateObj instanceof Date) {
      date = dateObj;
    } else {
      date = new Date(dateObj);
    }
    // 支持 yyyy 格式
    if (format === "yyyy") {
      return date.getFullYear().toString();
    }
    // 默认返回完整日期
    return date.toISOString().split("T")[0];
  });

  // 设置输入和输出目录
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "liquid", "html"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
