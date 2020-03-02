namespace EFUZ.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class UZ_VagonData
    {
        public int id { get; set; }

        [Required]
        [StringLength(150)]
        public string nom_doc { get; set; }

        [Required]
        [StringLength(12)]
        public string nomer { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? calc_weight { get; set; }

        //[StringLength(6)]
        //public string etsng_old { get; set; }

        //[StringLength(8)]
        //public string gng_old { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? gruzp { get; set; }

        //public int? is_removed { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? ostat_davl { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? kod_adm { get; set; }

        //[StringLength(6)]
        //public string kod_firm_owner { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? kol_conductor { get; set; }

        //public byte? kol_os { get; set; }

        //[StringLength(50)]
        //public string measure_equip_num { get; set; }

        //[StringLength(255)]
        //public string name_firm_owner { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? negab_do { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? negab_rs { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? negab_v { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? nom_ref { get; set; }

        //[Column(TypeName = "smalldatetime")]
        //public DateTime? pour_off_date { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? pr_sobst { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? pr_zam { get; set; }

        //[StringLength(50)]
        //public string promoted_by { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? remove_weight { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? rod_vag { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? roller_weight { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? tank_state { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? use { get; set; }

        //[StringLength(4)]
        //public string usl_tip { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? u_tara { get; set; }

        //[Column(TypeName = "numeric")]
        //public decimal? ves_tary_arc { get; set; }

        //public byte? zd_kod { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? dt { get; set; }

        //public byte? flag_railway { get; set; }
    }
}
