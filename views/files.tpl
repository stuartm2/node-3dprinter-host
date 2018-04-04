
<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th class="text-right">Size</th>
            <th><br></th>
        </tr>
    </thead>
    <tbody>
        {{#each files}}
        <tr>
            <td>{{ strip_filetype name }}</td>
            <td><span class="badge badge-info">{{ strip_filename name }}</span></td>
            <td class="text-right">{{ bytes size }}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-default btn-delete" data-filename="{{ escape name }}">Delete</button>
            </td>
        </tr>
        {{/each}}
    </tbody>
</table>
