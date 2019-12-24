namespace EFMT.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("METRANS.WagonsTracking")]
    public partial class WagonsTracking
    {
        public long id { get; set; }

        public int nvagon { get; set; }

        public int? st_disl { get; set; }

        [StringLength(50)]
        public string nst_disl { get; set; }

        public int? kodop { get; set; }

        [StringLength(50)]
        public string nameop { get; set; }

        [StringLength(100)]
        public string full_nameop { get; set; }

        public DateTime? dt { get; set; }

        public int? st_form { get; set; }

        [StringLength(50)]
        public string nst_form { get; set; }

        public int? idsost { get; set; }

        [StringLength(50)]
        public string nsost { get; set; }

        public int? st_nazn { get; set; }

        [StringLength(50)]
        public string nst_nazn { get; set; }

        public int? ntrain { get; set; }

        public int? st_end { get; set; }

        [StringLength(50)]
        public string nst_end { get; set; }

        public int? kgr { get; set; }

        [StringLength(500)]
        public string nkgr { get; set; }

        public int id_cargo { get; set; }

        public int? kgrp { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? ves { get; set; }

        public DateTime? updated { get; set; }

        public int? kgro { get; set; }

        public int? km { get; set; }
    }
}
