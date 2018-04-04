
function onDeleteBtnClicked(e) {
    e.preventDefault();
    var filename = $(e.target).data('filename');

    if (confirm(`Are you sure you want to delete ${filename}?`)) {
        $.ajax({
            url: `/files/${filename}`,
            type: 'DELETE',
            success: (result) => {
                var $row = $(this).parents('tr');
                $row.fadeOut({
                    complete: $row.remove
                });
            },
            error: () => console.log(`There was a problem deleting ${filename}`)
        });
    }
}

$(document).ready(() => {
    $('.btn-delete').click(onDeleteBtnClicked);
});
