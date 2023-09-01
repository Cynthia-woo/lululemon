//  Levenshtein Distance ==> get string similarity
const levenshteinDistance = (str1, str2) => {
    const m = str1?.length;
    const n = str2?.length;
    if(n===undefined){
        console.log(str2)
    }

    // 创建一个二维数组，用于存储中间结果
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

    // 初始化边界条件
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // 计算编辑距离
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // 删除操作
                    dp[i][j - 1] + 1, // 插入操作
                    dp[i - 1][j - 1] + 1 // 替换操作
                );
            }
        }
    }

    // 返回编辑距离
    return dp[m][n];
}

export const setLikeList = (list) => {
    const currentUrl = new URL(window.location.href);
    const productId = currentUrl.pathname.slice(10);
    let productIndex = undefined;

    // get the product index
    list.filter(item=>item.name!==undefined).map((item, index) => {
        if (productId === item.productId) {
            productIndex = index;
            // console.log("productIndex",productIndex)
        }
    })

    // calculate product name similarity
    list.slice(0,list.length-1).map((item, index) => {
        item.similarity = 1 - levenshteinDistance(list[productIndex]?.name, item?.name) / Math.max(list[productIndex]?.name?.length, item?.name?.length)
    })

    // sort itemList from name similarity
    list.sort((a, b) => b.similarity - a.similarity)

    sessionStorage.setItem('uniqueItemList', JSON.stringify(list));
    // console.log('unique!List',JSON.parse(sessionStorage.getItem('uniqueItemList')));
}