namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Arrival_UZ_Vagon_Acts")]
    public partial class Arrival_UZ_Vagon_Acts
    {
        public int id { get; set; }

        public long id_vagon { get; set; }

        public DateTime? date_akt { get; set; }

        public DateTime? date_dved { get; set; }

        [StringLength(9)]
        public string nom_akt { get; set; }

        public int? nom_dved { get; set; }

        [StringLength(70)]
        public string prichina_akt { get; set; }

        public int? stn_akt { get; set; }

        [StringLength(50)]
        public string stn_name_akt { get; set; }

        public int? type { get; set; }

        public int? vagon_nom { get; set; }

        public virtual Arrival_UZ_Vagon Arrival_UZ_Vagon { get; set; }
    }
}
