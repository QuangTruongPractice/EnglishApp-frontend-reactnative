import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/VocabularyDetailStyles";

const VocabularyDetailScreen = ({
  vocabulary,
  loading,
  error,
  loadSound,
  onGoBack,
  onToggleSave,
  onStartQuiz,
  onPractice = () => { },
  loadVocabulary = () => { },
  quizData,
  showQuizModal,
  setShowQuizModal,
  selectedAnswer,
  setSelectedAnswer,
  showQuizResult,
  checkAnswer,
  quizSound,
  // Practice Props
  isPractice = false,
  vocabIndex = 0,
  totalVocabs = 0,
  completedMeanings = [],
  isFinished = false,
  onNextWord,
  // Recording Props
  isRecording = false,
  recordingMeaningId = null,
  practiceLoading = false,
  practiceResult = null,
  showPracticeModal = false,
  setShowPracticeModal = () => { },
}) => {
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Đang tải từ vựng...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isPractice && isFinished) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.completionContent}>
          <View style={styles.successCircle}>
            <Ionicons name="trophy" size={60} color="#10b981" />
          </View>
          <Text style={styles.congratsTitle}>Tuyệt vời! 🎉</Text>
          <Text style={styles.congratsDesc}>
            Bạn đã hoàn thành toàn bộ bài tập từ vựng hàng ngày của hôm nay.{"\n"}
            Hãy duy trì thói quen này nhé!
          </Text>
          <TouchableOpacity style={[styles.nextBtn, { width: '100%' }]} onPress={onGoBack}>
            <Text style={styles.nextBtnText}>HOÀN TẤT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !vocabulary) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.errorText}>{error || "Không tìm thấy dữ liệu"}</Text>
          <TouchableOpacity onPress={loadVocabulary} style={styles.iconButton}>
            <Ionicons name="refresh" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const tagColors = ['#6366f1', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6'];
  const progressPercent = totalVocabs > 0 ? (vocabIndex / totalVocabs) * 100 : 0;
  const allMeaningsDone = vocabulary.meanings?.every(m => completedMeanings.includes(m.id));

  const highlightWord = (text, word) => {
    if (!text || !word) return <Text>{text}</Text>;
    const parts = text.split(new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <Text>
        {parts.map((part, i) =>
          part.toLowerCase() === word.toLowerCase() ? (
            <Text key={i} style={styles.highlight}>{part}</Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  const getBarColor = (score) => {
    if (score >= 0.9) return '#4ade80';
    if (score >= 0.8) return '#22c55e';
    if (score >= 0.7) return '#eab308';
    if (score >= 0.5) return '#f97316';
    return '#ef4444';
  };

  const getScoreRingColor = (type) => {
    if (type === 'overall') return '#818cf8';
    if (type === 'audio') return '#34d399';
    return '#fbbf24';
  };

  const renderScoreCircle = (value, label, type) => {
    const pct = Math.round((value > 1 ? value : value * 100));
    const ringColor = getScoreRingColor(type);
    return (
      <View style={styles.pronScoreCircleWrapper}>
        <View style={[styles.pronScoreRing, { borderColor: ringColor }]}>
          <View style={styles.pronScoreRingInner}>
            <Text style={[styles.pronScoreRingValue, { color: ringColor }]}>{pct}</Text>
            <Text style={styles.pronScoreRingSub}>/100</Text>
          </View>
        </View>
        <Text style={styles.pronScoreRingLabel}>{label}</Text>
      </View>
    );
  };

  const renderPracticeModal = () => {
    const resultData = practiceResult?.data;
    const step1 = resultData?.step1_audio_similarity;
    const step2 = resultData?.step2_phoneme_analysis;
    const wordDetails = step1?.word_details || [];
    const overallScore = resultData?.overall_score ?? practiceResult?.score ?? 0;
    const audioScore = step1?.average_score ?? 0;
    const phonemeAccuracy = step2?.accuracy ?? 0;
    const processingTime = resultData?.processing_time;

    const correctCount = step2?.details?.filter(d => d.status === 'correct').length || 0;
    const wrongCount = step2?.details?.filter(d => d.status !== 'correct').length || 0;

    return (
      <Modal
        visible={showPracticeModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowPracticeModal(false)}
      >
        <View style={styles.pronContainer}>
          {practiceLoading ? (
            <View style={styles.pronLoadingContainer}>
              <ActivityIndicator size="large" color="#6366f1" />
              <Text style={styles.pronLoadingText}>Đang phân tích giọng nói...</Text>
            </View>
          ) : practiceResult ? (
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.pronScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Header */}
              <View style={styles.pronHeader}>
                <View style={styles.pronHeaderLeft}>
                  <View style={styles.pronHeaderDot} />
                  <Text style={styles.pronHeaderLabel}>PRONUNCIATION ANALYSIS</Text>
                </View>
                {processingTime !== undefined && (
                  <View style={styles.pronHeaderRight}>
                    <Text style={styles.pronProcessingLabel}>Processing</Text>
                    <Text style={styles.pronProcessingValue}>{processingTime}s</Text>
                  </View>
                )}
              </View>

              {/* Expected Text */}
              <Text style={styles.pronExpectedText}>&quot;{practiceResult.example}&quot;</Text>

              {/* Three Score Circles */}
              <View style={styles.pronScoresCard}>
                {renderScoreCircle(overallScore, 'TỔNG ĐIỂM', 'overall')}
                {renderScoreCircle(audioScore, 'ÂM THANH', 'audio')}
                {renderScoreCircle(phonemeAccuracy, 'ÂM VỊ', 'phoneme')}
              </View>

              {/* Step 1 - Word Analysis */}
              {wordDetails.length > 0 && (
                <View style={styles.pronSectionCard}>
                  <View style={styles.pronSectionHeader}>
                    <Text style={styles.pronSectionTitle}>PHÂN TÍCH TỪNG TỪ</Text>
                    <View style={styles.pronStepBadge}>
                      <Text style={styles.pronStepBadgeText}>Step 1</Text>
                    </View>
                  </View>

                  {wordDetails.map((word, idx) => {
                    const pct = Math.round(word.similarity_score * 100);
                    const barColor = getBarColor(word.similarity_score);
                    return (
                      <View key={idx} style={styles.pronWordRow}>
                        <View style={styles.pronWordInfo}>
                          <Text style={styles.pronWordText}>{word.word}</Text>
                          <View style={styles.pronWordMeta}>
                            <Text style={styles.pronWordTime}>
                              {word.start.toFixed(2)}s - {word.end.toFixed(2)}s
                            </Text>
                            <Text style={[styles.pronWordPct, { color: barColor }]}>{pct}%</Text>
                          </View>
                        </View>
                        <View style={styles.pronBarTrack}>
                          <View style={[styles.pronBarFill, { width: `${pct}%`, backgroundColor: barColor }]} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {/* Step 2 - Phoneme Analysis */}
              {step2?.details && (
                <View style={styles.pronSectionCard}>
                  <View style={styles.pronSectionHeader}>
                    <Text style={styles.pronSectionTitle}>PHÂN TÍCH ÂM VỊ</Text>
                    <View style={styles.pronStepBadge}>
                      <Text style={styles.pronStepBadgeText}>Step 2</Text>
                    </View>
                  </View>

                  {/* Summary badges */}
                  <View style={styles.pronSummaryRow}>
                    <View style={styles.pronSummaryBadgeCorrect}>
                      <Text style={styles.pronSummaryBadgeText}>✓ {correctCount} đúng</Text>
                    </View>
                    <View style={styles.pronSummaryBadgeWrong}>
                      <Text style={styles.pronSummaryBadgeText}>✗ {wrongCount} sai</Text>
                    </View>
                  </View>

                  {/* Phoneme Grid */}
                  <View style={styles.pronPhonemeGrid}>
                    {step2.details.map((item, idx) => {
                      const isCorrect = item.status === 'correct';
                      return (
                        <View
                          key={idx}
                          style={[
                            styles.pronPhonemeCell,
                            {
                              backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                              borderColor: isCorrect ? '#86efac' : '#fca5a5',
                            }
                          ]}
                        >
                          <Text style={[
                            styles.pronPhonemeCellText,
                            { color: isCorrect ? '#166534' : '#991b1b' }
                          ]}>
                            {item.phoneme}
                          </Text>
                          <View style={[
                            styles.pronPhonemeIndicator,
                            { backgroundColor: isCorrect ? '#22c55e' : '#ef4444' }
                          ]} />
                        </View>
                      );
                    })}
                  </View>

                  {/* Expected vs User Phonemes */}
                  {step2.expected_phonemes && (
                    <View style={styles.pronPhonemeComparison}>
                      <Text style={styles.pronComparisonLabel}>CHUỖI MONG ĐỢI</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.pronPhonemeRow}>
                          {step2.expected_phonemes.map((p, i) => (
                            <View key={i} style={styles.pronPhonemeMiniCell}>
                              <Text style={styles.pronPhonemeMiniText}>{p}</Text>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                  )}

                  {step2.user_phonemes && (
                    <View style={styles.pronPhonemeComparison}>
                      <Text style={styles.pronComparisonLabel}>BẠN ĐÃ PHÁT ÂM</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.pronPhonemeRow}>
                          {step2.user_phonemes.map((p, i) => {
                            const expected = step2.expected_phonemes?.[i];
                            const isMatch = expected === p;
                            return (
                              <View
                                key={i}
                                style={[
                                  styles.pronPhonemeMiniCell,
                                  {
                                    backgroundColor: isMatch ? '#f0fdf4' : '#fef2f2',
                                    borderColor: isMatch ? '#86efac' : '#fca5a5',
                                  }
                                ]}
                              >
                                <Text style={[
                                  styles.pronPhonemeMiniText,
                                  { color: isMatch ? '#166534' : '#991b1b' }
                                ]}>{p}</Text>
                              </View>
                            );
                          })}
                        </View>
                      </ScrollView>
                    </View>
                  )}
                </View>
              )}

              {/* Close Button */}
              <TouchableOpacity
                style={styles.pronCloseBtn}
                onPress={() => setShowPracticeModal(false)}
              >
                <Text style={styles.pronCloseBtnText}>ĐÓNG</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : null}
        </View>
      </Modal>
    );
  };

  const renderQuizModal = () => (
    <Modal
      visible={showQuizModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowQuizModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Generated Quiz</Text>
            <TouchableOpacity onPress={() => setShowQuizModal(false)} style={styles.iconButton}>
              <Ionicons name="close" size={24} color="#1a1a1a" />
            </TouchableOpacity>
          </View>

          {quizData ? (
            <ScrollView style={styles.quizScroll} showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#888', marginBottom: 10 }}>QUESTION</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 20 }}>
                  {quizData.question}
                </Text>

                {quizData.type === 'AUDIO' && (
                  <TouchableOpacity
                    onPress={quizSound}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#f1f5f9',
                      padding: 15,
                      borderRadius: 16,
                      marginBottom: 20
                    }}
                  >
                    <Ionicons name="volume-high" size={24} color="#6366f1" />
                    <Text style={{ marginLeft: 10, fontWeight: '600', color: '#6366f1' }}>Nhấn để nghe câu hỏi</Text>
                  </TouchableOpacity>
                )}

                {!showQuizResult && quizData.text && quizData.type !== 'AUDIO' && (
                  <View style={{ backgroundColor: '#f8fafc', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0' }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '600' }}>{quizData.text}</Text>
                  </View>
                )}
              </View>

              <View style={{ gap: 12, marginBottom: 40 }}>
                {quizData.answers?.map((ans, idx) => {
                  const isSelected = selectedAnswer === ans.id;
                  const isCorrect = ans.isCorrect;
                  let bgColor = '#fff';
                  let borderColor = '#e2e8f0';
                  let textColor = '#1a1a1a';

                  if (showQuizResult) {
                    if (isCorrect) {
                      bgColor = '#ecfdf5';
                      borderColor = '#10b981';
                      textColor = '#047857';
                    } else if (isSelected) {
                      bgColor = '#fef2f2';
                      borderColor = '#ef4444';
                      textColor = '#991b1b';
                    }
                  } else if (isSelected) {
                    borderColor = '#6366f1';
                    bgColor = '#f5f7ff';
                  }

                  return (
                    <TouchableOpacity
                      key={ans.id}
                      onPress={() => !showQuizResult && setSelectedAnswer(ans.id)}
                      style={{
                        backgroundColor: bgColor,
                        padding: 18,
                        borderRadius: 16,
                        borderWidth: 2,
                        borderColor: borderColor,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <View style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: isSelected ? '#6366f1' : '#f1f5f9',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12
                      }}>
                        <Text style={{ color: isSelected ? '#fff' : '#64748b', fontWeight: 'bold' }}>
                          {String.fromCharCode(65 + idx)}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, flex: 1 }}>{ans.answer}</Text>
                      {showQuizResult && isCorrect && <Ionicons name="checkmark-circle" size={24} color="#10b981" />}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {!showQuizResult ? (
                <TouchableOpacity
                  disabled={!selectedAnswer}
                  onPress={checkAnswer}
                  style={{
                    backgroundColor: selectedAnswer ? '#6366f1' : '#cbd5e1',
                    padding: 18,
                    borderRadius: 16,
                    alignItems: 'center',
                    marginBottom: 50
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>XÁC NHẬN ĐÁP ÁN</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowQuizModal(false)}
                  style={{
                    backgroundColor: '#1a1a1a',
                    padding: 18,
                    borderRadius: 16,
                    alignItems: 'center',
                    marginBottom: 50
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>TIẾP TỤC</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          ) : (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#6366f1" />
              <Text style={{ marginTop: 10 }}>Đang khởi tạo bài quiz...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.iconButton}>
            <Ionicons name={isPractice ? "close" : "arrow-back"} size={20} color="#1a1a1a" />
          </TouchableOpacity>

          {isPractice ? (
            <View style={styles.headerCenter}>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
              </View>
              <Text style={styles.stepIndicator}>{vocabIndex + 1} / {totalVocabs}</Text>
            </View>
          ) : (
            <Text style={styles.headerTitle}>VOCABULARY</Text>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={onToggleSave} style={[styles.iconButton, { marginRight: 8 }]}>
              <Ionicons
                name={vocabulary.isSave ? "bookmark" : "bookmark-outline"}
                size={22}
                color={vocabulary.isSave ? "#6366f1" : "#1a1a1a"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#1a1a1a" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.contentPadding}>
            {/* Word Hero Section */}
            <View style={styles.wordHero}>
              <View style={styles.levelBadge}>
                <View style={styles.levelDot} />
                <Text style={styles.levelText}>{vocabulary.level} — BEGINNER</Text>
              </View>
              <Text style={styles.mainWord} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.5}>{vocabulary.word}</Text>
            </View>

            {/* Phonetic & Audio */}
            <View style={styles.phoneticContainer}>
              <Text style={styles.phoneticText}>{vocabulary.phonetic}</Text>
              <TouchableOpacity style={styles.playIconBtn} onPress={loadSound}>
                <Ionicons name="play" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Subtopics Tags */}
            <View style={styles.tagsContainer}>
              {vocabulary.subTopics?.map((topic, index) => (
                <View
                  key={topic.id}
                  style={[styles.tagPill, { borderColor: tagColors[index % tagColors.length] }]}
                >
                  <Text style={[styles.tagText, { color: tagColors[index % tagColors.length] }]}>
                    {topic.name}
                  </Text>
                </View>
              ))}
            </View>

            {/* Definitions Info */}
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>DEFINITIONS</Text>
              <Text style={styles.meaningCount}>{vocabulary.meanings?.length || 0} meanings</Text>
            </View>

            {/* Meanings List */}
            {vocabulary.meanings?.map((meaning, index) => {
              const isDone = isPractice && completedMeanings.includes(meaning.id);
              const isMeaningRecording = isRecording && recordingMeaningId === meaning.id;

              return (
                <View key={meaning.id} style={styles.meaningCard}>
                  <View style={styles.meaningHeader}>
                    <View style={styles.meaningHeaderLeft}>
                      <View style={[styles.indexCircle, isDone && { backgroundColor: '#10b981' }]}>
                        {isDone ? (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        ) : (
                          <Text style={styles.indexText}>{index + 1}</Text>
                        )}
                      </View>
                      <View style={styles.typeBadge}>
                        <Text style={styles.typeText}>{meaning.type}</Text>
                      </View>
                    </View>
                    <Text style={styles.vnWordText} numberOfLines={3} adjustsFontSizeToFit minimumFontScale={0.7}>{meaning.vnWord}</Text>
                  </View>

                  {/* Definitions */}
                  <View style={styles.defContainer}>
                    <Text style={styles.defLabel}>DEFINITION</Text>
                    <Text style={styles.defEn}>{meaning.definition}</Text>
                    <Text style={styles.defVn}>{meaning.vnDefinition}</Text>
                  </View>

                  {/* Example */}
                  {meaning.example && (
                    <View style={styles.exampleBlock}>
                      <Text style={styles.exampleEn}>
                        {highlightWord(meaning.example, vocabulary.word)}
                      </Text>
                      <Text style={styles.exampleVn}>{meaning.vnExample}</Text>
                    </View>
                  )}

                  {/* Images Section */}
                  {meaning.images && meaning.images.length > 0 && (
                    <View style={styles.imageGrid}>
                      <View style={styles.mainImage}>
                        <Image 
                          source={{ uri: typeof meaning.images[0] === 'string' ? meaning.images[0] : meaning.images[0].imageUrl }} 
                          style={styles.img} 
                        />
                      </View>
                      {meaning.images.length > 1 && (
                        <View style={styles.sideImages}>
                          <View style={styles.smallImage}>
                            <Image 
                              source={{ uri: typeof meaning.images[1] === 'string' ? meaning.images[1] : meaning.images[1].imageUrl }} 
                              style={styles.img} 
                            />
                          </View>
                          {meaning.images.length > 2 && (
                            <View style={styles.smallImage}>
                              <Image 
                                source={{ uri: typeof meaning.images[2] === 'string' ? meaning.images[2] : meaning.images[2].imageUrl }} 
                                style={styles.img} 
                              />
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  )}

                  {/* Synonyms Section */}
                  {meaning.synonyms && meaning.synonyms.length > 0 && (
                    <View style={styles.synonymSection}>
                      <Text style={styles.defLabel}>SYNONYMS</Text>
                      <View style={styles.synonymList}>
                        {meaning.synonyms.map((syn, sIdx) => {
                          const synonymText = typeof syn === 'string' ? syn : syn.word;
                          return (
                            <View key={sIdx} style={styles.synonymPill}>
                              <Text style={styles.synonymText}>{synonymText}</Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {/* Action Buttons */}
                  <View style={styles.meaningActions}>
                    <TouchableOpacity
                      style={[
                        styles.actionBtn,
                        isMeaningRecording ? styles.recordingBtn : styles.practiceBtn,
                      ]}
                      onPress={() => onPractice(meaning.id)}
                    >
                      <Ionicons
                        name={isMeaningRecording ? "stop" : "mic-outline"}
                        size={20}
                        color="#f45b69"
                      />
                      <Text style={isMeaningRecording ? styles.recordingBtnText : styles.practiceBtnText}>
                        {isMeaningRecording ? "Dừng ghi" : "Phát âm"}
                      </Text>
                    </TouchableOpacity>

                    {isDone ? (
                      <View style={[styles.actionBtn, styles.doneBtn]}>
                        <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                        <Text style={styles.doneBtnText}>Đã hoàn thành</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={[styles.actionBtn, styles.startBtn]}
                        onPress={() => onStartQuiz(meaning.id)}
                      >
                        <Ionicons name="play-outline" size={20} color="#fff" />
                        <Text style={styles.startBtnText}>Bắt đầu</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {isPractice && (
          <View style={styles.practiceFooter}>
            <TouchableOpacity
              style={[styles.nextBtn, !allMeaningsDone && styles.disabledBtn]}
              disabled={!allMeaningsDone}
              onPress={onNextWord}
            >
              <Text style={styles.nextBtnText}>
                {vocabIndex === totalVocabs - 1 ? "HOÀN THÀNH BÀI HỌC" : "TỪ TIẾP THEO"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {renderQuizModal()}
        {renderPracticeModal()}
      </View>
    </SafeAreaView>
  );
};

export default VocabularyDetailScreen;