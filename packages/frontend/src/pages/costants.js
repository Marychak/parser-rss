export const columns = [
  {
    accessorKey: '_id',
    header: 'id',
    enableEditing: false
  },
  {
    accessorKey: 'guid',
    header: 'guid'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'creator',
    header: 'Creator'
  },
  {
    accessorKey: 'content',
    header: 'Content'
  },
  {
    accessorKey: 'contentSnippet',
    header: 'Content snippet'
  },
  {
    accessorKey: 'isoDate',
    header: 'iso date'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated at'
  },
  {
    accessorKey: 'pubDate',
    header: 'Pub date'
  },
  {
    accessorKey: 'link',
    header: 'Link'
  }
];

export const defaultSort = [{ id: 'pubDate', desc: true }];
