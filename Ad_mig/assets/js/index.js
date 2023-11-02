let amount = 0;
$(function () {
  $.ajax({
    method: "post",
    url: "https://kyrgyz.space/isa/mig/api/get.php?q=catalogs",
    success: function (msg) {
      let json = JSON.parse(msg);
      let items = json.items;
      for (let i = 0; i < items.length; i++) {
        let el = $(`
        <div onclick="chooseCat('${items[i].ai}' , '${
          items[i].amount
        }')" class="flex items-center gap-2 mb-3 cursor-pointer">
            <div class="text-[20px]">
            <img class="w-[42px] h-[42px] rounded-[10px]" src="${
              json.URL + items[i].icon
            }"/>
            </div>
            <h3>${items[i].cat}</h3>
         </div>
        `);
        $(".items").append(el);
      }
    },
  });
});

function onSelected(event) {
  
}

function chooseCat(id, amount) {
  $(".first__block").fadeOut(0);

  if (amount > 1) {
    $.ajax({
      method: "post",
      url: "https://kyrgyz.space/isa/mig/api/get.php?q=subcats&id=" + id,
      success: function (msg) {
        console.log(msg);
        let json = JSON.parse(msg);
        let items = json.items;
        for (let i = 0; i < items.length; i++) {
          let e = $(`
        <div onclick="chooseSubCat('${
          items[i].ai
        }' )" class="flex items-center gap-2 mb-3 cursor-pointer">
            <div class="text-[20px]">
            <img class="w-[42px] h-[42px] rounded-[10px]" src="${
              json.URL + items[i].icon2
            }"/>
            </div>
            <h3>${items[i].subcat}</h3>
         </div>
        `);
          $(".second__items").append(e);
        }

        $(".second__block").fadeIn(300);
      },
    });
  } else {
    $(".third__block").fadeIn(200);
  }
}

function chooseSubCat(subCat) {
  $(".second__block").fadeOut(0);
  $(".third__block").fadeIn(300);
}

function exit() {
  if (amount < 2) {
    $(".first__block").fadeIn(300);
    $(".third__block").fadeOut(0);
    $(".second__block").fadeOut(0);
  } else {
    $(".second__block").fadeIn(300);
    $(".third__block").fadeOut(0);
  }
}
