namespace EFIDS.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class view_ways_status
    {
        [Key]
        [Column(Order = 0)]
        public int id { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_station { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_park { get; set; }

        [Key]
        [Column(Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int position_park { get; set; }

        [Key]
        [Column(Order = 4)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int position_way { get; set; }

        [Key]
        [Column(Order = 5)]
        [StringLength(20)]
        public string way_num_ru { get; set; }

        [Key]
        [Column(Order = 6)]
        [StringLength(20)]
        public string way_num_en { get; set; }

        [Key]
        [Column(Order = 7)]
        [StringLength(100)]
        public string way_name_ru { get; set; }

        [Key]
        [Column(Order = 8)]
        [StringLength(100)]
        public string way_name_en { get; set; }

        [Key]
        [Column(Order = 9)]
        [StringLength(50)]
        public string way_abbr_ru { get; set; }

        [Key]
        [Column(Order = 10)]
        [StringLength(50)]
        public string way_abbr_en { get; set; }

        public int? capacity { get; set; }

        public int? count_wagon { get; set; }

        public bool? deadlock { get; set; }

        public bool? crossing_uz { get; set; }

        public bool? crossing_amkr { get; set; }

        public int? id_devision { get; set; }

        public bool? dissolution { get; set; }

        public bool? output_dissolution { get; set; }

        [Key]
        [Column(Order = 11)]
        [StringLength(100)]
        public string note { get; set; }

        [Key]
        [Column(Order = 12)]
        public DateTime create { get; set; }

        [Key]
        [Column(Order = 13)]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
    }
}
