$(".btn-group[role='group'] a").on('click', function(){
    $(this).siblings().removeClass('active')
    $(this).addClass('active');
})