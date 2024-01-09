import { ContentRowItem } from "./ContentRowItem"
const items = [
    {
        id: crypto.randomUUID(),
        title: "Movies in Data Base",
        color: "primary",
        value: 21,
        icon: "fa-film"

    },
    {
        id: crypto.randomUUID(),
        color: "success",
        title: "Total awards",
        value: 79,
        icon: "fa-award"
    },
    {
        id: crypto.randomUUID(),
        color: "warning",
        title: "Actors quantity",
        value: 49,
        icon: "fa-user"
    }
]
export const ContentRowMovies = () => {
  return (
    <div className="row">
    {items.map(({id, title, color, value, icon}) => (
      <ContentRowItem
        key={id}
        title={title}
        value={value}
        color={color}
        icon={icon}
      />
    ))}
    </div>
  )
}
