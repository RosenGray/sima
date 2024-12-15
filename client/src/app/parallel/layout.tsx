'use client';

const ParallelLayout = ({route1,route2,route3}) => {
    console.log(route1)
    return <div className="parallel">
        <section className="route1">
            {route1}
        </section>
        <section className="route2">
            {route2}
        </section>
        <section className="route3">
            {route3}
        </section>
    </div>
}

export default ParallelLayout;