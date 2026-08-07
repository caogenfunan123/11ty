module.exports = function (eleventyConfig) {
  // 添加 date 过滤器（兼容 Liquid 和 Nunjucks）
  // Liquid 语法: {{ date | date: "%Y-%m-%d" }}
  // Nunjucks 语法: {{ date | date("yyyy-MM-dd") }}
  eleventyConfig.addFilter("date", function (dateObj, format) {
    let date;
    if (dateObj === "now" || !dateObj) {
      date = new Date();
    } else if (dateObj instanceof Date) {
      date = dateObj;
    } else {
      date = new Date(dateObj);
    }

    // Nunjucks 风格格式: yyyy MM dd
    if (format === "yyyy") {
      return date.getFullYear().toString();
    }
    if (format === "yyyy-MM-dd") {
      return date.toISOString().split("T")[0];
    }

    // Liquid 风格格式: %Y-%m-%d
    if (format && format.includes("%")) {
      const map = {
        "%Y": date.getFullYear(),
        "%m": String(date.getMonth() + 1).padStart(2, "0"),
        "%d": String(date.getDate()).padStart(2, "0"),
        "%H": String(date.getHours()).padStart(2, "0"),
        "%M": String(date.getMinutes()).padStart(2, "0"),
        "%S": String(date.getSeconds()).padStart(2, "0"),
      };
      let result = format;
      for (const [token, val] of Object.entries(map)) {
        result = result.replace(token, val);
      }
      return result;
    }

    // 默认返回 ISO 日期
    return date.toISOString().split("T")[0];
  });

  // 去除 HTML 标签（用于文章摘要）
  eleventyConfig.addFilter("stripHtml", function (value) {
    if (value === null || value === undefined) return "";
    return String(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  });

  // 显式创建 posts 集合：从 src/posts/ 目录收集所有 Markdown 文章
  // 按日期降序排列（最新的在前）
  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort(function (a, b) {
      return b.data.date - a.data.date;
    });
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
