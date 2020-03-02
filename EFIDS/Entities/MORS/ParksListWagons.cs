namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.ParksListWagons")]
    public partial class ParksListWagons
    {
        public int id { get; set; }

        public int id_park_wagon { get; set; }

        public int num { get; set; }

        public virtual CardsWagons CardsWagons { get; set; }

        public virtual ParksWagons ParksWagons { get; set; }
    }
}
