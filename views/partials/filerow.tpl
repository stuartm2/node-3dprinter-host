
<tr data-file="{{ to_json . }}">
    <td>{{ strip_filetype name }}</td>
    <td><span class="badge badge-info">{{ strip_filename name }}</span></td>
    <td class="text-right">{{ bytes size }}</td>
    <td class="text-center">
        <button class="btn btn-sm btn-default btn-delete" data-filename="{{ escape name }}">Delete</button>
    </td>
    <td class="text-center">
        <button class="btn btn-sm btn-default btn-print" data-filename="{{ escape name }}">Print</button>
    </td>
</tr>
